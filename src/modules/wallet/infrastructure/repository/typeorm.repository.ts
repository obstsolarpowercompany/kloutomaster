import { Wallet } from "@modules/wallet/domain/entities/wallet.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IWalletRepository } from "@wallet/infrastructure/domain/wallet.repository";
import { Repository } from "typeorm";

@Injectable()
export class TypeormWalletRepository implements IWalletRepository {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {  }

    listByUser(userId: string): Promise<any> {
        return this.walletRepository.findOne({ where: { userId } });
    }
}