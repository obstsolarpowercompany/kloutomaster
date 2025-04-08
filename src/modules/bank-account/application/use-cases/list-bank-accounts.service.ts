import { Inject, Injectable } from '@nestjs/common';
import { IApplicationService } from '@modules/shared/application/service/base.service';
import { GetBankAccountsDTO } from '../../infrastructure/dto/get-bank-accounts.dto';
import { BANK_ACCOUNT } from '../injection-tokens/tokens';
import { IBankAccountRepository } from '@modules/bank-account/domain/contracts/bank-account.repository';
import { ListBankAccountsCommand } from './list-bank-accounts.command';

@Injectable()
export class ListBankAccountsService implements IApplicationService<ListBankAccountsCommand> {
  constructor(
    @Inject(BANK_ACCOUNT)
    private readonly bankAccountRepository: IBankAccountRepository,
  ) { }

  async process(command: ListBankAccountsCommand): Promise<any> {
    return await this.bankAccountRepository.findAll(command);
  }
}
