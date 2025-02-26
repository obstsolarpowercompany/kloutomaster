import { Follower } from './entities/following.entity';
import { Repository } from 'typeorm';
import { UserProfile } from '../user/entities/userProfile.entity';
export declare class FollowingService {
    private followerRepo;
    private userProfileRepo;
    constructor(followerRepo: Repository<Follower>, userProfileRepo: Repository<UserProfile>);
    private static isFollowing;
    static setFollowingMode(isEnabled: boolean): void;
    static getFollowingMode(): boolean;
    private readonly API_KEY;
    validateKey(providedKey: string): void;
    followUser(followerId: string, username: string): Promise<{
        message: string;
        data: {
            follower: {
                id: any;
                first_name: any;
                last_name: any;
                username: any;
                avatar_url: any;
            };
            followingProfile: {
                id: any;
                first_name: any;
                last_name: any;
                username: any;
                avatar_url: any;
            };
            id: string;
            followedAt: Date;
        };
    }>;
    getterRoute(): Promise<{
        message: string;
    }>;
    restart(): {
        message: string;
    };
    unfollowUser(followerId: string, username: string): Promise<{
        message: string;
    }>;
    getUserFollowers(identifier: string, query: {
        limit?: number;
        page?: number;
        filter?: string;
    }): Promise<{
        message: string;
        data: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            avatar_url: string;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserFollowing(identifier: string, query: {
        limit?: number;
        page?: number;
        filter?: string;
    }): Promise<{
        message: string;
        data: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            avatar_url: string;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
