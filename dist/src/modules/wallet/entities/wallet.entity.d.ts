import { User } from '../../user/entities/user.entity';
export declare class Wallet {
    id: string;
    created_at: Date;
    updated_at: Date;
    balance: number;
    account_number: string;
    userId: string;
    user: User;
}
