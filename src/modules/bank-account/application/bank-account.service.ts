import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountEntity } from '@bank-account/domain/entities/bank-account.entity';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly bankAccountRepository: Repository<BankAccountEntity>,
  ) { }

  async getBankAccountById(bankAccountId: number): Promise<BankAccountEntity> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { id: bankAccountId },
    });

    if (!bankAccount) {
      throw new NotFoundException(`Bank account with ID ${bankAccountId} not found`);
    }

    return bankAccount;
  }
}
