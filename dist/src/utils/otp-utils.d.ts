import { OTP } from '../modules/user/entities/otp.entity';
import UserService from '../modules/user/user.service';
import { EntityManager, Repository } from 'typeorm';
export declare function generateAndSaveOtp(otpRepository: Repository<OTP>, email: string, userId: string): Promise<{
    savedOtp: OTP;
    otpCode: string;
}>;
export declare function validateOtp(email: string, otp: string, userId: string, userService: UserService, manager?: EntityManager): Promise<boolean>;
export declare function getOtp(email: string, otpStore: Map<string, {
    otp: string;
    expiry: Date;
}>): string | undefined;
