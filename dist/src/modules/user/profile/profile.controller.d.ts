import { ProfileService } from './profile.service';
import { OnboardUserProfileDto, UpdateUserProfileDto } from '../dto/profile.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getUserProfile(req: any): Promise<{
        message: string;
        data: import("../entities/userProfile.entity").UserProfile;
    }>;
    getUserProfileById(req: any, userId: string): Promise<{
        message: string;
        data: import("../entities/userProfile.entity").UserProfile;
    }>;
    getUserProfileByUsername(req: any, username: string): Promise<{
        message: string;
        data: import("../entities/userProfile.entity").UserProfile;
    }>;
    updateUserProfile(req: any, updateUserProfileDto: UpdateUserProfileDto): Promise<{
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
        } & import("../entities/userProfile.entity").UserProfile;
    }>;
    onBoardUserProfile(req: any, onboardUserProfileDto: OnboardUserProfileDto): Promise<{
        message: string;
        data: import("../entities/userProfile.entity").UserProfile;
    }>;
    onBoardUserStatus(req: any): Promise<{
        message: string;
        data: {
            onboardStatus: boolean;
        };
    }>;
}
