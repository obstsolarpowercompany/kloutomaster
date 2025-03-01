import { ListWalletService } from "@modules/wallet/application/list-wallet.service";
import { GetWalletByUserCommand } from "@modules/wallet/application/use-cases/get-wallet-by-user.command";
import { BadRequestException, Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@modules/auth/infrastructure/guards/auth.guard";
import { Request } from "express";
import { Wallet } from "@modules/wallet/domain/entities/wallet.entity";
import { PageDTO } from "@modules/shared/infrastructure/dto/page.dto";


@UseGuards(AuthGuard)
@Controller('wallet')
export class WalletController {

    constructor(
        private listWalletService: ListWalletService,
    ) { }

    @Get('user')
    async findByUser(@Req() req: Request): Promise<any> {
        const command = new GetWalletByUserCommand({
            userId: req!.user['id']
        })
        try {
            const wallet = await this.listWalletService.process(command)
            return PageDTO(wallet)
        } catch (err) {
            throw new BadRequestException(err)
        }
    }
}