import { IApplicationService } from "@modules/shared/application/service/base.service";
import { CreateBankAccountCommand } from "@modules/bank-account/application/use-cases/create-bank-account.command";
import { BankAccountEntity } from "@modules/bank-account/domain/entities/bank-account.entity";
import { IBankAccountRepository } from "@modules/bank-account/domain/contracts/bank-account.repository";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BANK_ACCOUNT } from "../injection-tokens/tokens";

@Injectable()
export class CreateBankAccountService implements IApplicationService<CreateBankAccountCommand> {
    constructor(
        @Inject(BANK_ACCOUNT)
        private readonly bankAccountRepository: IBankAccountRepository
    ) { }
    
    async process(command: CreateBankAccountCommand): Promise<BankAccountEntity> {
        try {
            return await this.bankAccountRepository.create(command)
        } catch (err) {
            const error = err as Error;
            throw new BadRequestException(error.message, err.name);
        }
    }
}