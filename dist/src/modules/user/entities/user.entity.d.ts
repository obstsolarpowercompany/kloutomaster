import { AbstractBaseEntity } from "../../../entities/base.entity";
import { UserProfile } from "./userProfile.entity";
import { Follower } from "../../following/entities/following.entity";
import { RefreshToken } from "./refreshToken.entity";
import { Wallet } from "../../wallet/entities/wallet.entity";
export declare enum UserType {
    SUPER_ADMIN = "super-admin",
    ADMIN = "admin",
    USER = "user"
}
export declare class User extends AbstractBaseEntity {
    id: string;
    email: string;
    status: string;
    is_active: boolean;
    is_verified: boolean;
    is_creator: boolean;
    profile: UserProfile;
    deletedAt?: Date;
    user_type: string;
    wallet: Wallet;
    followers: Follower[];
    following: Follower[];
    interests: string[];
    refreshTokens: RefreshToken[];
    created_at: Date;
    updated_at: Date;
}
