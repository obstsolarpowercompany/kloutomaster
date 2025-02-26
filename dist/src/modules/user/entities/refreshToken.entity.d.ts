import { User } from './user.entity';
export declare class RefreshToken {
    id: string;
    userId: string;
    token: string;
    createdAt: Date;
    expires: Date;
    user: User;
}
