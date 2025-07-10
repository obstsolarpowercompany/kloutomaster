import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException, StreamableFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, FindOptionsWhere, Repository } from "typeorm";

import * as SYS_MSG from "../../main/application/SystemMessages";
import { User } from "../domain/entities/user.entity";
import CreateNewUserOptions from "../domain/CreateNewUserOptions";
import UpdateUserRecordOption from "../domain/UpdateUserRecordOption";
import UserResponseDTO from "../infrastructure/dto/user-response.dto";
import UserIdentifierOptionsType from "../domain/UserIdentifierOptions";
import { UpdateUserDto } from "../infrastructure/dto/update-user-dto";
import { UserPayload } from "../domain/entities/interfaces/user-payload.interface";
import { CustomHttpException } from "../../main/infrastructure/custom-http-filter";
import { pick } from "src/helpers/pick";
import { OTP } from "../domain/entities/otp.entity";
import { MailingService } from "../../mailing/application/mailing.service";
import * as bcrypt from "bcryptjs";
import { generateAndSaveOtp, generateAndSavePhoneOtp, validateOtp } from "../../auth/application/otp-utils";
import { UserProfile } from "../domain/entities/userProfile.entity";
import { CreateUserWithPhoneDTO } from "@modules/auth/infrastructure/controllers/dto/phone-register-dto";
import { WhatsAppService } from "@modules/whatsapp/whatsapp.service";

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userProfileRepo: Repository<UserProfile>,
    @InjectRepository(OTP) private otpRepository: Repository<OTP>,
    private mailingService: MailingService,
    private dataSource: DataSource,
    private whatsAppService: WhatsAppService
  ) {}
  private readonly logger = new Logger(UserService.name);

  async findAllUsers(cursor: number, limit: number = 10) {
    // Order priority in terms of verified users and number of primers and remove
    // users not onboarded
    const users = await this.userRepository.find({
      relations: ["profile"],
      where: { profile: { onboarded: true } },
      order: {
        profile: {
          is_verified: "DESC",
          is_creator: "DESC",
          number_of_followers: "DESC",
          // TODO: In terms of users interests
        },
      },
      take: limit,
      skip: cursor,
    });

    return users;
  }

  async createUser(userData: CreateNewUserOptions, manager: EntityManager): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, userData);

    // Start generating OTP and saving user/OTP within the transaction
    const { savedOtp, otpCode } = await generateAndSaveOtp(manager.getRepository(OTP), newUser.email, newUser.id);

    const savedUser = await manager.save(newUser);

    // Now save the UserProfile after ensuring the email is sent
    try {
      await this.mailingService.sendSignupEmail(savedUser.email, savedUser.email, otpCode);

      // After email is successfully sent, create the profile
      const newUserProfile = new UserProfile();
      newUserProfile.user = savedUser;
      newUserProfile.email = savedUser.email;
      this.logger.log("User profile assigned", JSON.stringify(newUserProfile, null, 2));
      await manager.save(newUserProfile);
    } catch (error) {
      // Roll back user creation if email fails
      this.logger.error("Rollback transaction started...");
      console.log(error);
      await manager.getRepository(User).delete(savedUser.id);
      await manager.getRepository(OTP).delete(savedOtp.id);
      throw new CustomHttpException("Failed to send OTP email", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return savedUser;
  }

  async createUserWithPhone(userData: CreateUserWithPhoneDTO, manager: EntityManager): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, userData);

    // Generate and save phone OTP
    const { savedOtp, otpCode } = await generateAndSavePhoneOtp(manager.getRepository(OTP), newUser.phone, newUser.id);

    const savedUser = await manager.save(newUser);

    // Send WhatsApp OTP
    try {
      const otpSent = await this.whatsAppService.sendOTP(newUser.phone, otpCode);

      if (!otpSent) {
        throw new Error("Failed to send WhatsApp OTP");
      }
      // Create the profile after OTP is sent
      const newUserProfile = new UserProfile();
      newUserProfile.user = savedUser;
      newUserProfile.phone = savedUser.phone;

      this.logger.log("User profile assigned for phone registration", JSON.stringify(newUserProfile, null, 2));

      await manager.save(newUserProfile);
    } catch (error) {
      // Roll back user creation if WhatsApp OTP fails
      this.logger.error("Rolling back phone registration...", error);
      // await manager.getRepository(User).delete(savedUser.id);
      await manager.getRepository(OTP).delete(savedOtp.id);
      throw new CustomHttpException("Failed to send WhatsApp OTP", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return savedUser;
  }

  async loginUserService(loginDto: Partial<User>, manager: EntityManager) {
    const user = await this.getUserRecord({
      identifier: loginDto.email,
      identifierType: "email",
    });

    if (!user) {
      throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    // Generate OTP and save user and OTP within the transaction
    const { savedOtp, otpCode } = await generateAndSaveOtp(manager.getRepository(OTP), user.email, user.id);
    console.log(user);
    const userProfile = await manager.getRepository(UserProfile).findOne({
      where: { user_id: user.id },
    });
    const first_name = userProfile?.first_name ?? user.email;

    // Send email after transaction completes
    try {
      await this.mailingService.sendLoginOtpEmail(user.email, first_name, otpCode);
    } catch (error) {
      // Roll back user creation if email fails
      await manager.getRepository(OTP).delete(savedOtp.id);
      throw new CustomHttpException("Failed to send OTP email", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return user;
  }

  async saveOtpByEmail(email: string, otp: string): Promise<void> {
    await this.otpRepository.save({ email, otp, createdAt: new Date() });
  }

  async updateUserRecord(userUpdateOptions: UpdateUserRecordOption) {
    const { updatePayload, identifierOptions } = userUpdateOptions;
    const user = await this.getUserRecord(identifierOptions);
    Object.assign(user, updatePayload);
    await this.userRepository.save(user);
  }

  private async getUserByEmail(email: string) {
    const user: UserResponseDTO = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }
  // private async getUserByUsername(username: string) {
  //   const user: UserResponseDTO = await this.userRepository.findOne({
  //     where: { username: usernam },
  //   });
  //   return user;
  // }

  private async getUserById(identifier: string) {
    const user: UserResponseDTO = await this.userRepository.findOne({
      where: { id: identifier },
    });
    return user;
  }

  async getUserRecord(identifierOptions: UserIdentifierOptionsType) {
    const { identifier, identifierType } = identifierOptions;

    const GetRecord = {
      id: async () => this.getUserById(String(identifier)),
      email: async () => this.getUserByEmail(String(identifier)),
    };

    return await GetRecord[identifierType]();
  }

  async getUserByEmailTrans(email: string, manager: EntityManager) {
    return await manager.findOne(User, { where: { email } });
  }

  async getUserByPhoneTrans(phone: string, manager: EntityManager) {
    return await manager.findOne(User, { where: { phone } });
  }

  async updateUser(userId: string, updatedUserDto: UpdateUserDto, user) {}

  async updateUserDetails(updateUserDto: UpdateUserDto, manager?: EntityManager) {
    const userRepo = manager ? manager.getRepository(User) : this.userRepository;

    try {
      const user = await userRepo.findOne({ where: { id: updateUserDto.id } });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      // Assign the updated properties to the existing user
      Object.assign(user, updateUserDto);

      // Save the updated user within the provided transaction context
      return await userRepo.save(user);
    } catch (error) {
      throw new BadRequestException({
        error: "Bad Request",
        message: "Failed to update user",
        status_code: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async softDeleteUser(userId: string, authenticatedUserId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomHttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (user.id !== authenticatedUserId) {
      throw new CustomHttpException("You are not authorized to delete this user", HttpStatus.UNAUTHORIZED);
    }

    await this.userRepository.softDelete(userId);

    return {
      status: "success",
      message: "Deletion in progress",
    };
  }

  async verifyOtp(email: string, otpCode: string): Promise<void> {
    const otpEntry = await this.otpRepository.findOne({ where: { email } });

    if (!otpEntry) {
      throw new BadRequestException("No OTP found for this email.");
    }

    if (otpEntry.otp_code !== otpCode) {
      otpEntry.attempts += 1;
      await this.otpRepository.save(otpEntry);

      if (otpEntry.attempts >= 3) {
        await this.otpRepository.delete({ email });
        throw new BadRequestException("OTP attempts exceeded. Please request a new OTP.");
      }

      throw new BadRequestException("Invalid OTP. Please try again.");
    }

    // OTP is correct, delete OTP record and update user verification
    await this.otpRepository.delete({ email });
    await this.userRepository.update({ email }, { is_verified: true });
  }

  async getLastOtpByEmail(email: string, manager?: EntityManager): Promise<OTP | undefined> {
    const otpRepo = manager ? manager.getRepository(OTP) : this.otpRepository;

    return await otpRepo.findOne({
      where: { email },
      order: { createdAt: "DESC" },
    });
  }

  async deleteValidatedOtp(email: string, manager?: EntityManager): Promise<void> {
    const otpRepo = manager ? manager.getRepository(OTP) : this.otpRepository;

    await otpRepo.delete({ email });
  }

  async deleteValidated(email: string, manager?: EntityManager): Promise<void> {
    const otpRepo = manager ? manager.getRepository(OTP) : this.otpRepository;

    await otpRepo.delete({ email });
  }

  async verifyOtpForAction(email: string, otp: string, manager: EntityManager): Promise<User> {
    const user = await this.getUserRecord({
      identifier: email,
      identifierType: "email",
    });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const isValidOtp = await validateOtp(email, otp, user.id, this, manager);
    if (!isValidOtp) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_INVALID("Otp"), HttpStatus.BAD_REQUEST);
    }

    // Update user to mark them as verified or logged in, based on your requirement
    const updatedUser = await this.updateUserDetails({ id: user.id, is_verified: true }, manager);

    return updatedUser;
  }

  async sendOtpMail(email: string, first_name: string, otpCode: string) {
    try {
      await this.mailingService.sendSignupEmail(email, first_name, otpCode);
    } catch (error) {
      throw new CustomHttpException("Failed to send OTP email", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
