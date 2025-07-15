import { CustomHttpException } from "../../main/infrastructure/custom-http-filter";
import UserService from "./user.service";
import * as SYS_MSG from "../../main/application/SystemMessages";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "../domain/entities/userProfile.entity";
import { Not, Repository } from "typeorm";
import { OnboardUserProfileDto, UpdateUserProfileDto } from "../infrastructure/dto/profile.dto";
import { User } from "../domain/entities/user.entity";
import { WhatsAppService } from "@modules/auth/application/whatsapp.service";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile) private profileRepo: Repository<UserProfile>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private whatsAppService: WhatsAppService,
    private userService: UserService
  ) {}

  // async updateOnboardedField(): Promise<void> {
  //   await this.profileRepo
  //     .createQueryBuilder()
  //     .update(UserProfile)
  //     .set({ onboarded: false })
  //     .where(
  //       'first_name IS NULL OR first_name = :empty OR last_name IS NULL OR last_name = :empty OR username IS NULL OR username = :empty',
  //       { empty: '' },
  //     )
  //     .execute();

  //   console.log('User profiles updated!');
  // }

  // async onModuleInit() {
  //   // Call the method on startup
  //   await this.updateOnboardedField();
  // }

  async findProfileById(id: string) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: id } },
    });
    if (!profile) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User profile"), HttpStatus.NOT_FOUND);
    }
    return profile;
  }

  async getUserProfile(id: string) {
    const user = await this.userService.getUserRecord({
      identifier: id,
      identifierType: "id",
    });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User"), HttpStatus.NOT_FOUND);
    }

    const userProfile = await this.findProfileById(id);

    return {
      message: SYS_MSG.RESOURCE_FETCHED("User profile"),
      data: userProfile,
    };
  }

  async getUserProfileByUsername(username: string) {
    const user = await this.profileRepo.findOne({ where: { username } });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND(`User with ${username}`), HttpStatus.NOT_FOUND);
    }

    return {
      message: SYS_MSG.RESOURCE_FETCHED("User profile"),
      data: user,
    };
  }

  async updateUserProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const user = await this.userService.getUserRecord({
      identifier: id,
      identifierType: "id",
    });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User"), HttpStatus.NOT_FOUND);
    }

    const userProfile = await this.findProfileById(id);
    if (!userProfile) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User profile"), HttpStatus.NOT_FOUND);
    }

    const updatedUserProfile = await this.profileRepo.save({
      ...userProfile,
      ...updateUserProfileDto,
    });

    return {
      message: SYS_MSG.RESOURCE_UPDATED("User profile"),
      data: updatedUserProfile,
    };
  }

  async onboardUserProfile(userId: string, payload: OnboardUserProfileDto) {
    const user = await this.userService.getUserRecord({
      identifier: userId,
      identifierType: "id",
    });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User"), HttpStatus.NOT_FOUND);
    }

    const { email, username, phone } = payload;

    if (email || username || phone) {
      const conflictUser = await this.userRepository.findOne({
        where: [
          email ? { email, id: Not(user.id) } : undefined,
          username ? { username, id: Not(user.id) } : undefined,
          phone ? { phone, id: Not(user.id) } : undefined,
        ].filter(Boolean),
      });

      if (conflictUser) {
        if (email && conflictUser.email === email) {
          throw new CustomHttpException("Email is already in use", HttpStatus.BAD_REQUEST);
        }
        if (username && conflictUser.username === username) {
          throw new CustomHttpException("Username is already taken", HttpStatus.BAD_REQUEST);
        }
        if (phone && conflictUser.phone === phone) {
          throw new CustomHttpException("Phone number already in use", HttpStatus.BAD_REQUEST);
        }
      }
    }

    var formattedNumber = phone ? this.whatsAppService.formatPhoneNumber(phone) : null;
    await this.userService.updateUserRecord({
      identifierOptions: { identifier: userId, identifierType: "id" },
      updatePayload: {
        email,
        username,
        phone: formattedNumber,
      },
    });

    let userProfile: UserProfile;

    // Find the user profile or create a new one if not found
    userProfile = await this.findProfileById(userId);

    if (!userProfile) {
      userProfile = this.profileRepo.create({
        user: user,
      });
    }

    // Update the profile fields with data from the payload
    userProfile.first_name = payload.first_name;
    userProfile.email = payload.email;
    userProfile.avatar_url = payload.avatar_url;
    userProfile.last_name = payload.last_name;
    userProfile.username = payload.username;
    userProfile.bio = payload.bio;
    userProfile.phone = formattedNumber;

    // user object
    //user.email = payload.email;
    // user.phone = payload.phone;
    // user.username = payload.username;

    // Mark the profile as onboarded
    userProfile.onboarded = true;

    // Save the updated profile
    await this.profileRepo.save(userProfile);

    return {
      message: SYS_MSG.RESOURCE_UPDATED("User profile"),
      data: userProfile,
    };
  }

  async checkOnboardedStatus(userId: string) {
    const user = await this.userService.getUserRecord({
      identifier: userId,
      identifierType: "id",
    });
    if (!user) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User"), HttpStatus.NOT_FOUND);
    }

    const userProfile = await this.findProfileById(userId);
    if (!userProfile) {
      throw new CustomHttpException(SYS_MSG.RESOURCE_NOT_FOUND("User profile"), HttpStatus.NOT_FOUND);
    }

    const onboardStatus = userProfile.onboarded;

    return {
      message: SYS_MSG.RESOURCE_FETCHED("User profile onboarded status"),
      data: { onboardStatus },
    };
  }
}
