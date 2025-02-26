import UserService from '../user.service';
import { UserProfile } from '../entities/userProfile.entity';
import { Repository } from 'typeorm';
import { OnboardUserProfileDto, UpdateUserProfileDto } from '../dto/profile.dto';
export declare class ProfileService {
    private profileRepo;
    private userService;
    constructor(profileRepo: Repository<UserProfile>, userService: UserService);
    findProfileById(id: string): Promise<UserProfile>;
    getUserProfile(id: string): Promise<{
        message: string;
        data: UserProfile;
    }>;
    getUserProfileByUsername(username: string): Promise<{
        message: string;
        data: UserProfile;
    }>;
    updateUserProfile(id: string, updateUserProfileDto: UpdateUserProfileDto): Promise<{
        message: string;
        data: {
            first_name: string;
            last_name: string;
            email: string;
            username: string;
            avatar_url: string;
            bio: string;
            phone: string;
            id: string;
            user: import("../entities/user.entity").User;
            location: string;
            age: string;
            production_name: string;
            is_creator: boolean;
            onboarded: boolean;
            number_of_posts: number;
            number_of_videos: number;
            number_of_followers: number;
            number_of_following: number;
            updated_at: Date;
        } & UserProfile;
    }>;
    onboardUserProfile(userId: string, payload: OnboardUserProfileDto): Promise<{
        message: string;
        data: UserProfile;
    }>;
    checkOnboardedStatus(userId: string): Promise<{
        message: string;
        data: {
            onboardStatus: boolean;
        };
    }>;
}
