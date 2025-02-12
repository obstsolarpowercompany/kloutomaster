import { FollowingService } from './following.service';
export declare class FollowingController {
    private readonly followingService;
    constructor(followingService: FollowingService);
    create(req: any, username: string): Promise<{
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
    unfollowUser(req: any, username: string): Promise<{
        message: string;
    }>;
    getAuthenticatedFollowers(req: any, query: any): Promise<{
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
    getAuthenticatedFollowing(req: any, query: any): Promise<{
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
    getFollowers(identifier: string, query: any): Promise<{
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
    getFollowing(identifier: string, query: any): Promise<{
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
    followed(apiKey: string): Promise<{
        message: string;
    }>;
    unfollowed(apiKey: string): Promise<{
        message: string;
    }>;
}
