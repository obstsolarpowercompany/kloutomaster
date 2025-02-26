import { User } from './user.entity';
export declare class UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    user: User;
    avatar_url: string;
    bio: string;
    location: string;
    phone: string;
    age: string;
    production_name: string;
    is_creator: boolean;
    onboarded: boolean;
    number_of_posts: number;
    number_of_videos: number;
    number_of_followers: number;
    number_of_following: number;
    updated_at: Date;
}
