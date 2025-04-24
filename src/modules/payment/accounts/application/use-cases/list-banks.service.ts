import { IApplicationService } from "@modules/shared/application/service/base.service";
import { ListBanksCommand } from "./list-banks-command";
import { BadRequestException, Inject } from "@nestjs/common";
import { PAYSTACK } from "@modules/payment/application/injection-tokens/tokens";
import { IPaystackService } from "@modules/payment/domain/contracts/paystack.interface";
;
export class ListBanksService implements IApplicationService<ListBanksCommand> {
  constructor(
    @Inject(PAYSTACK)
    private readonly payStackService: IPaystackService,
  ) {}
  process(command: ListBanksCommand): Promise<any> {
    const error = new Error('Bank listing failed');
    error.name = 'BANK_LISTING_FAILED'
    try {
      return this.payStackService.listBanks(command);
    } catch (error) {
      throw new BadRequestException(error.name, error.stack);
    }
  }
}
