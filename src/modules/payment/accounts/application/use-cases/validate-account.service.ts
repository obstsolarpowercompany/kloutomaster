import { IApplicationService } from "@modules/shared/application/service/base.service";
import { ValidateAccountCommand } from "./validate-account.command";
import { BadRequestException, Inject } from "@nestjs/common";
import { PAYSTACK } from "@modules/payment/application/injection-tokens/tokens";
import { IPaystackService } from "@modules/payment/domain/contracts/paystack.interface";

export class ValidateAccountService implements IApplicationService<ValidateAccountCommand> {
  constructor(
    @Inject(PAYSTACK)
    private readonly payStackService: IPaystackService,
  ) {}
  
  async process(command: ValidateAccountCommand): Promise<any> {
    const error = new Error('Account validation failed');
    error.name = 'ACCOUNT_VALIDATION_FAILED'
    try {
        return this.payStackService.validateAccount(command);
    } catch (error) {
        throw new BadRequestException(error.name, error.stack);
    }
  }
}