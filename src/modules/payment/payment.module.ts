import { Module } from "@nestjs/common";
import { PaymentService } from "./application/payment.service";
import { PaymentController } from "./infrastructure/controllers/payment.controller";
import { AccountsController } from "./accounts/infrastructure/controllers/accounts.controller";
import { ListBanksService } from "./accounts/application/use-cases/list-banks.service";
import { PAYSTACK } from "./application/injection-tokens/tokens";
import { PayStackService } from "./application/paystack.service";
import { HttpModule } from "@nestjs/axios";
import { ValidateAccountService } from "./accounts/application/use-cases/validate-account.service";

@Module({
  imports: [HttpModule],
  controllers: [PaymentController, AccountsController],
  providers: [
    PaymentService, 
    ListBanksService, 
    ValidateAccountService,
    {
      useClass: PayStackService,
      provide: PAYSTACK,
    }
  ],
})
export class PaymentModule {}
