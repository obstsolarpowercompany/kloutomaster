import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import UserService from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto/create-user.dto';
import { ConfirmOtpDto, ResendOTPDto } from './dto/confirm-otp.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from '../user/entities/refreshToken.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
export default class AuthenticationService {
    private userService;
    private jwtService;
    private configService;
    private dataSource;
    private readonly entityManager;
    private walletRepo;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService, dataSource: DataSource, entityManager: EntityManager, walletRepo: Repository<Wallet>);
    createNewUser(createUserDto: CreateUserDTO): Promise<{
        message: string;
        data: {
            user: {
                id: string;
                email: string;
            };
            wallet: {
                id: string;
                account_number: string;
                balance: number;
            };
        };
    }>;
    login(loginDto: LoginDto, res: any): Promise<{
        message: string;
    }>;
    confirmLoginByOtp(confirmOtpDto: ConfirmOtpDto, res: any): Promise<{
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            data: {
                id: string;
                email: string;
                profile: import("../user/entities/userProfile.entity").UserProfile;
            };
        };
    }>;
    refreshAccessToken(refreshToken: string, res: any): Promise<{
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    confirmEmailByOtp(confirmOtpDto: ConfirmOtpDto, res: any): Promise<{
        message: string;
        data: {
            id: string;
            email: string;
            status: string;
            is_active: boolean;
            is_verified: boolean;
            is_creator: boolean;
            profile: import("../user/entities/userProfile.entity").UserProfile;
            deletedAt?: Date;
            user_type: string;
            wallet: Wallet;
            followers: import("../following/entities/following.entity").Follower[];
            following: import("../following/entities/following.entity").Follower[];
            interests: string[];
            refreshTokens: RefreshToken[];
            created_at: Date;
            updated_at: Date;
            access_token: string;
            refresh_token: string;
        };
    }>;
    resendOtp(resendOTPDto: ResendOTPDto, res: any): Promise<{
        message: string;
    }>;
    setCookie(token: string, res: Response): Promise<void>;
    generateOTP(length?: number): Promise<string>;
    hashOTP(otp: string): Promise<string>;
    generateAccessToken(user: User): Promise<string>;
    generateRefreshToken(user: User): Promise<string>;
    setAuthCookies(accessToken: string, refreshToken: string, res: Response): Promise<void>;
}
