import { IApplicationService } from "@modules/shared/application/service/base.service";
import { GetWalletByUserCommand } from "./use-cases/get-wallet-by-user.command";
import { WALLET } from "./injection-tokens/tokens";
import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { IWalletRepository } from "@modules/wallet/infrastructure/domain/contracts/wallet.repository";


@Injectable()
export class ListWalletService implements IApplicationService<GetWalletByUserCommand> {
    constructor(
        @Inject(WALLET)
        private readonly walletRepository: IWalletRepository
    ) {}

    process(command: GetWalletByUserCommand): Promise<any> {
        const wallet = this.walletRepository.listByUser(command.userId);
        if (!wallet) {
            const namedErr = new Error('Wallet not found');
            namedErr.name = 'WalletNotFound';
            throw new NotFoundException(
                namedErr,
            )
        }
        return wallet;
    }
}