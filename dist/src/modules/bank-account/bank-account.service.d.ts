import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';
export declare class BankAccountService {
    private readonly bankAccountRepository;
    constructor(bankAccountRepository: Repository<BankAccount>);
    getBankAccountById(bankAccountId: number): Promise<BankAccount>;
}
