import { Module } from "@nestjs/common";
import { BankAccountController } from "./infrastructure/controllers/bank-account.controller";
import { BANK_ACCOUNT } from "./application/injection-tokens/tokens";
import { ListBankAccountsService } from "./application/use-cases/list-bank-accounts.service";
import { TypeOrmBankAccountRepository } from "./infrastructure/repository/typeorm-bank-account.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BankAccountEntity } from "./domain/entities/bank-account.entity";
import { CreateBankAccountService } from "./application/use-cases/create-bank-account.service";
import { PayStackService } from "@modules/payment/application/paystack.service";
import { HttpModule } from "@nestjs/axios";
import { PAYSTACK } from "@modules/payment/application/injection-tokens/tokens";
import { GetBankAccountService } from "./application/use-cases/get-bank-account.service";
import { DeleteBankAccountService } from "./application/use-cases/delete-bank-account.service";
import { UpdateBankAccountService } from "./application/use-cases/update-bank-account.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BankAccountEntity,
        ]),
        HttpModule,
    ],
    controllers: [BankAccountController],
    providers: [
        ListBankAccountsService,
        CreateBankAccountService,
        GetBankAccountService,
        DeleteBankAccountService,
        UpdateBankAccountService,
        {
            useClass: PayStackService,
            provide: PAYSTACK
        },
        {
            useClass: TypeOrmBankAccountRepository,
            provide: BANK_ACCOUNT
        }
    ],
    exports: [],
})
export class BankAccountModule {}