import { Response } from 'express';
import AuthenticationService from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ConfirmOtpDto, ResendOTPDto } from './dto/confirm-otp.dto';
import { LoginDto } from './dto/login.dto';
export default class RegistrationController {
    private authService;
    constructor(authService: AuthenticationService);
    register(body: CreateUserDTO): Promise<any>;
    confirmEmailByOtp(confirmOtpDto: ConfirmOtpDto, res: Response): Promise<{
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
            wallet: import("../wallet/entities/wallet.entity").Wallet;
            followers: import("../following/entities/following.entity").Follower[];
            following: import("../following/entities/following.entity").Follower[];
            interests: string[];
            refreshTokens: import("../user/entities/refreshToken.entity").RefreshToken[];
            created_at: Date;
            updated_at: Date;
            access_token: string;
            refresh_token: string;
        };
    }>;
    LoginUser(loginDto: LoginDto, res: Response): Promise<{
        message: string;
    }>;
    confirmLoginByOtp(confirmOtpDto: ConfirmOtpDto, res: Response): Promise<{
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
    resendOtp(resendOTPDto: ResendOTPDto, res: Response): Promise<{
        message: string;
    }>;
    refreshToken(req: any, res: Response): Promise<{
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
