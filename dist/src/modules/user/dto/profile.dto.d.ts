export declare class CreateUserProfileDto {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    avatar_url?: string;
    bio?: string;
    phone?: string;
}
export declare class UpdateUserProfileDto {
    first_name?: string;
    last_name?: string;
    email?: string;
    username?: string;
    avatar_url?: string;
    bio?: string;
    phone?: string;
}
export declare class OnboardUserProfileDto {
    first_name: string;
    last_name: string;
    username: string;
    bio?: string;
    phone?: string;
}
export declare class UserProfileResponseDto {
    id: string;
    first_name: string;
    last_name: string | null;
    email: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    phone: string | null;
    number_of_posts: number;
    number_of_videos: number;
    number_of_followers: number;
    number_of_following: number;
    updated_at: string;
}
export declare class OnboardUserProfileStatusResponseDto {
    onboarded: boolean;
}
