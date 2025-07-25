import { HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import * as speakeasy from "speakeasy";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import UserService from "../../user/application/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDTO } from "../infrastructure/controllers/dto/create-user.dto";
import { CustomHttpException } from "../../main/infrastructure/custom-http-filter";
import * as SYS_MSG from "../../main/application/SystemMessages";
import crypto from "crypto";
import { generateAndSaveOtp, validateOtp } from "../application/otp-utils";
import { ConfirmOtpDto, ResendOTPDto } from "../infrastructure/controllers/dto/confirm-otp.dto";
import { DataSource, EntityManager, Repository } from "typeorm";
import { OTP } from "../../user/domain/entities/otp.entity";
import { User } from "../../user/domain/entities/user.entity";
import { LoginDto } from "../infrastructure/controllers/dto/login.dto";
import { RefreshToken } from "../../user/domain/entities/refreshToken.entity";
import { generateAccountNumber } from "../../wallet/application/wallet.helper";
import { InjectRepository } from "@nestjs/typeorm";
import { Wallet } from "../../wallet/domain/entities/wallet.entity";
import { CreateUserWithPhoneDTO, ResendPhoneOTPDTO, VerifyPhoneOTPDTO } from "../infrastructure/controllers/dto/phone-register-dto";
import { WhatsAppService } from "@modules/auth/application/whatsapp.service";
import { TwoFactorService } from "./two-factor.service";
import { EnableTwoFactorDto, TwoFactorResponseDto } from "../infrastructure/controllers/dto/two-factor-response.dto";
import { UsernameLoginDto } from "../infrastructure/controllers/dto/username-login.dto";
import { UserProfileResponseDto } from "@modules/user/infrastructure/dto/profile.dto";

@Injectable()
export default class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private dataSource: DataSource,
    private whatsAppService: WhatsAppService,
    private twoFactorService: TwoFactorService,
    private readonly entityManager: EntityManager,
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>
  ) {}

  async createNewUser(createUserDto: CreateUserDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    // Start a transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if user already exists
      const userExists = await this.userService.getUserByEmailTrans(createUserDto.email, queryRunner.manager);

      if (userExists) {
        throw new CustomHttpException(SYS_MSG.USER_ACCOUNT_EXIST, HttpStatus.BAD_REQUEST);
      }

      // Save new user within the transaction
      const newUser = await this.userService.createUser(createUserDto, queryRunner.manager);

      // Create a wallet for the new user within the same transaction
      const accountNumber = await generateAccountNumber(this.walletRepo);
      const newWallet = this.walletRepo.create({
        user: { id: newUser.id },
        account_number: accountNumber,
        balance: 0,
      });

      await queryRunner.manager.save(newWallet);

      // Prepare response payload
      const responsePayload = {
        user: {
          id: newUser.id,
          email: newUser.email,
        },
        wallet: {
          id: newWallet.id,
          account_number: newWallet.account_number,
          balance: newWallet.balance,
        },
      };

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
        data: responsePayload,
      };
    } catch (error) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async createNewUserWithPhone(createUserDto: CreateUserWithPhoneDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    // Start a transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if user already exists
      const userExists = await this.userService.getUserByPhoneTrans(createUserDto.phone, queryRunner.manager);

      if (userExists) {
        throw new CustomHttpException("An account with the number already exists, sign in", HttpStatus.BAD_REQUEST);
      }

      // Save new user within the transaction
      const newUser = await this.userService.createUserWithPhone(createUserDto, queryRunner.manager);

      // Create a wallet for the new user within the same transaction
      const accountNumber = await generateAccountNumber(this.walletRepo);
      const newWallet = this.walletRepo.create({
        user: { id: newUser.id },
        account_number: accountNumber,
        balance: 0,
      });

      await queryRunner.manager.save(newWallet);

      // Prepare response payload
      const responsePayload = {
        user: {
          id: newUser.id,
          phone: newUser.phone,
        },
        wallet: {
          id: newWallet.id,
          account_number: newWallet.account_number,
          balance: newWallet.balance,
        },
      };

      // Commit the transaction
      await queryRunner.commitTransaction();

      return {
        message: SYS_MSG.USER_CREATED_SUCCESSFULLY,
        data: responsePayload,
      };
    } catch (error) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  // Controller method to handle login request and send OTP
  async login(loginDto: LoginDto, res: any) {
    return await this.dataSource.transaction(async (manager) => {
      const user = await this.userService.loginUserService(loginDto, manager);

      if (!user) {
        throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
      }

      return {
        message: SYS_MSG.OTP_SENT_SUCCESSFULLY("Login "),
      };
    });
  }

  // Controller method to confirm OTP for login
  async confirmLoginByOtp(confirmOtpDto: ConfirmOtpDto, res: any) {
    return await this.dataSource.transaction(async (manager) => {
      const user = await this.userService.verifyOtpForAction(confirmOtpDto.email, confirmOtpDto.otp, manager);

      const access_token = await this.generateAccessToken(user);
      const refresh_token = await this.generateRefreshToken(user);

      await this.setAuthCookies(access_token, refresh_token, res);
      const responsePayload = {
        access_token,
        refresh_token,
        data: { id: user.id, email: user.email, profile: user.profile },
      };
      return {
        message: "OTP verified successfully. Login complete.",
        data: responsePayload,
      };
    });
  }
  // Method to refresh access token
  async refreshAccessToken(refreshToken: string, res: any) {
    if (!refreshToken) {
      throw new CustomHttpException("Refresh token missing", HttpStatus.BAD_REQUEST);
    }

    const storedToken = await this.entityManager.findOne(RefreshToken, {
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.expires < new Date()) {
      throw new CustomHttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }

    const user = (await this.userService.getUserRecord({
      identifier: storedToken.userId,
      identifierType: "id",
    })) as User;

    // Generate a new access token
    const access_token = await this.generateAccessToken(user);

    // Generate a new refresh token
    const newRefreshToken = await this.generateRefreshToken(user);

    // Set the new tokens in cookies
    await this.setAuthCookies(access_token, newRefreshToken, res);

    const response = { access_token, refresh_token: newRefreshToken };
    return { message: "Tokens refreshed successfully", data: response };
  }

  async confirmEmailByOtp(confirmOtpDto: ConfirmOtpDto, res: any) {
    return await this.dataSource.transaction(async (manager) => {
      const updatedUser = await this.userService.verifyOtpForAction(confirmOtpDto.email, confirmOtpDto.otp, manager);

      const access_token = await this.generateAccessToken(updatedUser);
      const refresh_token = await this.generateRefreshToken(updatedUser);

      // get onboardedstatus
      const userProfile = await this.userService.getUserProfileById(updatedUser.id);
      await this.setAuthCookies(access_token, refresh_token, res);

      return {
        message: "OTP verified successfully. Sign-up complete.",
        data: { access_token, refresh_token, ...updatedUser, onboarded: userProfile.onboarded },
      };
    });
  }

  async confirmPhoneByOtp(confirmOtpDto: VerifyPhoneOTPDTO, res: any) {
    return await this.dataSource.transaction(async (manager) => {
      const phone = this.whatsAppService.formatPhoneNumber(confirmOtpDto.phone);
      const updatedUser = await this.userService.verifyOtpPhoneForAction(phone, confirmOtpDto.otp, manager);

      const access_token = await this.generateAccessToken(updatedUser);
      const refresh_token = await this.generateRefreshToken(updatedUser);

      const userProfile = await this.userService.getUserProfileById(updatedUser.id);
      await this.setAuthCookies(access_token, refresh_token, res);

      return {
        message: "OTP verified successfully. Sign-up complete.",
        data: { access_token, refresh_token, ...updatedUser, onboarded: userProfile.onboarded },
      };
    });
  }

  async resendOtp(resendOTPDto: ResendOTPDto, res: any) {
    return await this.entityManager.transaction(async (manager) => {
      const email = resendOTPDto.email;

      const user = await this.userService.getUserRecord({
        identifier: email,
        identifierType: "email",
      });

      if (!user) {
        throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // Find the last OTP entry for the user
      const lastOtp = await this.userService.getLastOtpOfUser(email, this.entityManager);

      // If there's an existing OTP, delete it
      if (lastOtp) {
        await this.userService.deleteValidatedOtp(email, this.entityManager);
      }

      const { savedOtp, otpCode } = await generateAndSaveOtp(manager.getRepository(OTP), user.email, user.id);

      // Send OTP (e.g., via email or SMS)
      try {
        await this.userService.sendOtpMail(email, email, otpCode);
      } catch (error) {
        // Rollback user creation and OTP if email sending fails
        await manager.getRepository(OTP).delete(savedOtp.id);
        throw new CustomHttpException("Failed to send OTP email", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Return a success message
      return {
        message: "OTP has been resent to your mail",
      };
    });
  }
  async resendPhoneOtp(resendOTPDto: ResendPhoneOTPDTO, res: any) {
    return await this.entityManager.transaction(async (manager) => {
      const phone = this.whatsAppService.formatPhoneNumber(resendOTPDto.phone);

      const user = await this.userService.getUserByPhoneTrans(phone, this.entityManager);

      if (!user) {
        throw new CustomHttpException(SYS_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      // Find the last OTP entry for the user
      const lastOtp = await this.userService.getLastOtpOfUser(phone, this.entityManager, "number");

      // If there's an existing OTP, delete it
      if (lastOtp) {
        await this.userService.deleteValidatedOtp(phone, this.entityManager, "number");
      }

      const { savedOtp, otpCode } = await generateAndSaveOtp(manager.getRepository(OTP), user.phone, user.id, "phone");

      // Send OTP (e.g., via email or SMS)
      try {
        const otpSent = await this.whatsAppService.sendOTP(phone, otpCode);

        if (!otpSent) {
          throw new Error("Failed to send WhatsApp OTP");
        }
      } catch (error) {
        // Rollback user creation and OTP if email sending fails
        await manager.getRepository(OTP).delete(savedOtp.id);
        throw new CustomHttpException("Failed to send OTP mobile", HttpStatus.INTERNAL_SERVER_ERROR);
      }

      // Return a success message
      return {
        message: "OTP has been to your whatsapp",
      };
    });
  }

  async setCookie(token: string, res: Response) {
    const cookieExpiry = this.configService.get<number>("auth.cookieExpiry");

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: cookieExpiry,
    });
  }

  async generateOTP(length: number = 6): Promise<string> {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
  }

  async hashOTP(otp: string): Promise<string> {
    const saltRounds = this.configService.get<number>("auth.saltRounds");
    return bcrypt.hash(otp, saltRounds);
  }

  // Method to generate access token
  async generateAccessToken(user: User) {
    const payload = { id: user.id, sub: user.id, email: user.email, phone: user.phone };
    const secret = this.configService.get("auth.jwtSecret");
    const tokenExpiryTime = parseInt(this.configService.get("auth.jwtExpiry"));
    const access_token = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: tokenExpiryTime,
    });
    return access_token;
  }

  // Method to generate refresh token
  async generateRefreshToken(user: User) {
    const payload = { id: user.id, sub: user.id, email: user.email, phone: user.phone };
    const secret = this.configService.get("auth.jwtSecret");
    const tokenExpiryTime = parseInt(this.configService.get("auth.refreshTokenExpiryDays"));
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + tokenExpiryTime);
    console.log("Refresh tojen expiry date: ", expiryDate);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: tokenExpiryTime + "d",
    });

    // const refreshToken = crypto.randomBytes(64).toString('hex');
    // const expiryDate = new Date();
    // expiryDate.setDate(
    //   expiryDate.getDate() +
    //     this.configService.get('auth.refreshTokenExpiryDays'),
    // );
    await this.entityManager.save(RefreshToken, {
      userId: user.id,
      token: refreshToken,
      expires: expiryDate,
    });
    return refreshToken;
  }

  // Method to set access and refresh tokens in cookies
  async setAuthCookies(accessToken: string, refreshToken: string, res: Response) {
    const cookieExpiry = this.configService.get<number>("auth.cookieExpiry");
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: cookieExpiry,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: this.configService.get<number>("auth.refreshCookieExpiry"),
    });
  }
  async setupTwoFactorAuthentication(userId: string): Promise<TwoFactorResponseDto> {
    var user = await this.userService.getUserRecord({ identifier: userId, identifierType: "id" });
    if (!user) throw new CustomHttpException("User not found", HttpStatus.NOT_FOUND);
    if (user.two_factor_enabled) throw new CustomHttpException("Two factor authentication already enabled", HttpStatus.BAD_REQUEST);
    const userIdentifier = user.email || user.phone || user.username;
    var twoFactorData = await this.twoFactorService.generateTwoFactorSecret(userIdentifier);
    return {
      qrCode: twoFactorData.qrCode,
      secret: twoFactorData.secret,
      manualEntryKey: twoFactorData.manualEntryKey,
    };
  }

  async verifyAndEnableTwoFactor(
    twoFaRequest: EnableTwoFactorDto,
    userId: string
  ): Promise<{
    message: string;
    backupCodes: string[];
    enabled: boolean;
  }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get user
      const { secret, code: totpCode } = twoFaRequest;
      const user = await this.userService.getUserByIdTrans(userId, queryRunner.manager);

      if (!user) {
        throw new CustomHttpException("User not found", HttpStatus.NOT_FOUND);
      }

      if (user.two_factor_enabled) {
        throw new CustomHttpException("2FA is already enabled for this user", HttpStatus.BAD_REQUEST);
      }

      console.log("this is the secret: ", secret);
      console.log("this is the totp code: ", totpCode);
      // Verify the TOTP code
      const isValidToken = this.twoFactorService.verifyTwoFactorToken(totpCode, secret);

      if (!isValidToken) {
        throw new CustomHttpException("Invalid verification code", HttpStatus.BAD_REQUEST);
      }

      const backupCodes = this.twoFactorService.generateBackupCodes(10);
      // Hash backup codes for secure storage
      const hashedBackupCodes = await this.twoFactorService.hashBackupCodes(backupCodes);

      // Enable 2FA and save to database
      user.two_factor_secret = secret;
      user.two_factor_enabled = true;
      user.two_factor_enabled_at = new Date();
      user.two_factor_backup_codes = hashedBackupCodes;

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return {
        message: "2FA has been successfully enabled",
        backupCodes: backupCodes,
        enabled: true,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async loginWithTwoFactor(request: UsernameLoginDto, res: Response) {
    const user = await this.userService.getUserByUsernameTrans(request.username, this.entityManager);

    if (!user) {
      throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    if (!user.two_factor_enabled) {
      throw new CustomHttpException("you dont have two factor authentication enabled", HttpStatus.BAD_REQUEST);
    }

    const isValidToken = this.twoFactorService.verifyTwoFactorToken(request.otpCode, user.two_factor_secret);

    if (!isValidToken) {
      throw new CustomHttpException(SYS_MSG.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    const { id, email, phone, username, is_active, is_verified, two_factor_enabled, is_creator } = user;

    const access_token = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user);

    await this.setAuthCookies(access_token, refresh_token, res);

    return {
      message: "OTP verified successfully. Sign-up complete.",
      data: { access_token, refresh_token, id, email, phone, username, is_active, is_verified, two_factor_enabled, is_creator },
    };
  }
}
