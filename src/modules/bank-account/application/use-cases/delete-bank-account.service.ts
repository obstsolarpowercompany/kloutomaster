import { IApplicationService } from "@modules/shared/application/service/base.service";
import { DeleteBankAccountCommand } from "./delete-bank-account.command";
import { BANK_ACCOUNT } from "../injection-tokens/tokens";
import { Inject } from "@nestjs/common";
import { IBankAccountRepository } from "@modules/bank-account/domain/contracts/bank-account.repository";

export class DeleteBankAccountService
  implements IApplicationService<DeleteBankAccountCommand>
{
  constructor(
    @Inject(BANK_ACCOUNT)
    private readonly bankAccountRepository: IBankAccountRepository
  ) {}

  async process(command: DeleteBankAccountCommand) {
    return this.bankAccountRepository.delete(command)
  }
}
