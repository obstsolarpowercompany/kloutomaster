declare class UserDTO {
    id: string;
    first_name: string | null;
    last_name: string | null;
    username: string;
    avatar_url: string | null;
}
export declare class GetFollowingResponseDTO {
    status_code: number;
    message: string;
    data: UserDTO[];
}
export declare class FollowUserResponseDTO {
    status_code: number;
    message: string;
    data: {
        follower: UserDTO;
        followingProfile: UserDTO;
        id: string;
        followedAt: string;
    };
}
export {};
