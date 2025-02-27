import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './domain/entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly bankAccountRepository: Repository<BankAccount>,
  ) { }

  async getBankAccountById(bankAccountId: number): Promise<BankAccount> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id: bankAccountId },
    });

    if (!bankAccount) {
      throw new NotFoundException(`Bank account with ID ${bankAccountId} not found`);
    }

    return bankAccount;
  }
}
