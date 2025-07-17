import { IBankAccountRepository } from "@modules/bank-account/domain/contracts/bank-account.repository";
import { Inject } from "@nestjs/common";
import { BANK_ACCOUNT } from "../injection-tokens/tokens";

export class GetBankAccountService {
  constructor(
    @Inject(BANK_ACCOUNT)
    private readonly bankAccountRepository: IBankAccountRepository
  ) {}

  async process(id: string) {
    return this.bankAccountRepository.getBankAccountById(id);
  }
}
