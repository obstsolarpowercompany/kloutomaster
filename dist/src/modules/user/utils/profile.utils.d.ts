import { UserProfile } from '../entities/userProfile.entity';
import { Repository } from 'typeorm';
export declare function getUserIdByIdentifier(identifier: string, userProfileRepo: Repository<UserProfile>): Promise<string>;
export declare function mapProfileToResponse(profile: any): {
    id: any;
    first_name: any;
    last_name: any;
    username: any;
    avatar_url: any;
};
