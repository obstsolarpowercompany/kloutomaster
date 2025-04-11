import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetBankAccountsDTO } from "../dto/get-bank-accounts.dto";
import { ListBankAccountsService } from "@modules/bank-account/application/use-cases/list-bank-accounts.service";
import { PageDTO } from "@modules/shared/infrastructure/dto/page.dto";
import { ListBankAccountsCommand } from "@modules/bank-account/application/use-cases/list-bank-accounts.command";
import { Request } from "express";
import { CreateBankAccountDTO } from "../dto/create-bank-account.dto";
import { CreateBankAccountCommand } from "@modules/bank-account/application/use-cases/create-bank-account.command";
import { CreateBankAccountService } from "@modules/bank-account/application/use-cases/create-bank-account.service";
import { DeleteBankAccountCommand } from "@modules/bank-account/application/use-cases/delete-bank-account.command";
import { DeleteBankAccountService } from "@modules/bank-account/application/use-cases/delete-bank-account.service";
import { GetBankAccountService } from "@modules/bank-account/application/use-cases/get-bank-account.service";
import { UpdateBankAccountDTO } from "../dto/update-bank-account.dto";
import { UpdateBankAccountCommand } from "@modules/bank-account/application/use-cases/update-bank-account.command";
import { UpdateBankAccountService } from "@modules/bank-account/application/use-cases/update-bank-account.service";

@ApiTags('Bank Account')
@Controller('bank-accounts')
export class BankAccountController {
    constructor(
        private readonly listBankAccountsService: ListBankAccountsService,
        private readonly createBankAccountService: CreateBankAccountService,
        private readonly getBankAccountService: GetBankAccountService,
        private readonly deleteBankAccountService: DeleteBankAccountService,
        private readonly updateBankAccountService: UpdateBankAccountService,
    ) {
    }

    @Get('all')
    async findAll(@Query() query: GetBankAccountsDTO, @Req() req: Request) {
        const command = new ListBankAccountsCommand({
            userId: req!.user['id']
        })
        try {
            const bankAccounts = await this.listBankAccountsService.process(command)
            return PageDTO(bankAccounts)
        } catch (err) {
            const error = err as Error;
            console.log(error.message)
            throw new BadRequestException(error.name, error.stack)
        }
    }

    @Get('by-id/:bankAccountId')
    async findById(@Param('bankAccountId') bankAccountId: string) {
        try {
            const bankAccount = await this.getBankAccountService.process(bankAccountId)
            return PageDTO(bankAccount)
        } catch (err) {
            const error = err as Error;
            throw new BadRequestException(error.message, error.name)
        }
    }
    
    @Post()
    create(@Body() body: CreateBankAccountDTO, @Req() req: Request) {
        const command = new CreateBankAccountCommand({
            ...body,
            userId: req!.user['id']
        })
        try {
            const bankAccount = this.createBankAccountService.process(command)
            return bankAccount
        } catch (err) {
            const error = err as Error;
            throw new BadRequestException(error.name, error.stack)
        }
    }

    @HttpCode(204)
    @Delete('by-id/:bankAccountId')
    deleteById(@Param('bankAccountId') bankAccountId: string, @Req() req: Request) {
        const command = new DeleteBankAccountCommand({
            userId: req!.user['id'],
            bankAccountId: bankAccountId
        })
        return this.deleteBankAccountService.process(command);
    }
    
    @Patch('by-id/:bankAccountId')
    updateById(@Param('bankAccountId') bankAccountId: string, @Body() body: UpdateBankAccountDTO, @Req() req: Request) {
        const command = new UpdateBankAccountCommand({
            userId: req!.user['id'],
            bankAccountId: bankAccountId,
            ...body
        })
        return this.updateBankAccountService.process(command);
    }
}