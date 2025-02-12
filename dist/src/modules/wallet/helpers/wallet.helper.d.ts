import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
export declare function generateAccountNumber(walletRepo: Repository<Wallet>): Promise<string>;
