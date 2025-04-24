import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "@modules/wallet/domain/entities/wallet.entity";
import { TypeormWalletRepository } from "./infrastructure/repository/typeorm.repository";
import { WALLET } from "./application/injection-tokens/tokens";
import { ListWalletService } from "./application/list-wallet.service";
import { WalletController } from "@wallet/infrastructure/controllers/wallet.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    controllers: [WalletController],
    providers: [
        ListWalletService,
        {
            useClass: TypeormWalletRepository,
            provide: WALLET
        }
    ]
})
export class WalletModule {}