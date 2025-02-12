import { User } from '../../user/entities/user.entity';
export declare class Follower {
    id: string;
    follower: User;
    followee: User;
    followedAt: Date;
}
