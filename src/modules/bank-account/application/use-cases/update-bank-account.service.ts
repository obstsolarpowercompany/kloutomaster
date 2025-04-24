import { IApplicationService } from "@modules/shared/application/service/base.service";
import { UpdateBankAccountCommand } from "@modules/bank-account/application/use-cases/update-bank-account.command";
import { IBankAccountRepository } from "@modules/bank-account/domain/contracts/bank-account.repository";
import { BANK_ACCOUNT } from "../injection-tokens/tokens";
import { BadRequestException, Inject } from "@nestjs/common";


export class UpdateBankAccountService implements IApplicationService<UpdateBankAccountCommand> {
    constructor(
        @Inject(BANK_ACCOUNT)
        private readonly bankAccountRepository: IBankAccountRepository
    ) {}
    async process(command: UpdateBankAccountCommand): Promise<any> {
        try {
            return await this.bankAccountRepository.update(command)
        } catch (err) {
            const error = err as Error;
            throw new BadRequestException(error.message, err.name);
        }
    }
}