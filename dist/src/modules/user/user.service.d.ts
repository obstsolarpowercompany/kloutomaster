import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import CreateNewUserOptions from './options/CreateNewUserOptions';
import UpdateUserRecordOption from './options/UpdateUserRecordOption';
import UserIdentifierOptionsType from './options/UserIdentifierOptions';
import { UpdateUserDto } from './dto/update-user-dto';
import { OTP } from './entities/otp.entity';
import { MailingService } from '../mailing/mailing.service';
import { UserProfile } from './entities/userProfile.entity';
export default class UserService {
    private userRepository;
    private userProfileRepo;
    private otpRepository;
    private mailingService;
    private dataSource;
    constructor(userRepository: Repository<User>, userProfileRepo: Repository<UserProfile>, otpRepository: Repository<OTP>, mailingService: MailingService, dataSource: DataSource);
    findAllUsers(): Promise<{
        message: string;
        data: User[];
    }>;
    createUser(userData: CreateNewUserOptions, manager: EntityManager): Promise<User>;
    loginUserService(loginDto: Partial<User>, manager: EntityManager): Promise<any>;
    saveOtpByEmail(email: string, otp: string): Promise<void>;
    updateUserRecord(userUpdateOptions: UpdateUserRecordOption): Promise<void>;
    private getUserByEmail;
    private getUserById;
    getUserRecord(identifierOptions: UserIdentifierOptionsType): Promise<any>;
    getUserByEmailTrans(email: string, manager: EntityManager): Promise<User>;
    updateUser(userId: string, updatedUserDto: UpdateUserDto, user: any): Promise<void>;
    updateUserDetails(updateUserDto: UpdateUserDto, manager?: EntityManager): Promise<User>;
    softDeleteUser(userId: string, authenticatedUserId: string): Promise<any>;
    verifyOtp(email: string, otpCode: string): Promise<void>;
    getLastOtpByEmail(email: string, manager?: EntityManager): Promise<OTP | undefined>;
    deleteValidatedOtp(email: string, manager?: EntityManager): Promise<void>;
    deleteValidated(email: string, manager?: EntityManager): Promise<void>;
    verifyOtpForAction(email: string, otp: string, manager: EntityManager): Promise<User>;
    sendOtpMail(email: string, first_name: string, otpCode: string): Promise<void>;
}
