import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ListBanksCommand } from "../accounts/application/use-cases/list-banks-command";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { IPaystackService } from "../domain/contracts/paystack.interface";
import { ValidateAccountCommand } from "../accounts/application/use-cases/validate-account.command";

@Injectable()
export class PayStackService implements IPaystackService {
    private readonly logger = new Logger(PayStackService.name);
    private readonly baseUrl = 'https://api.paystack.co';
    private readonly PAYSTACK_SECRET_KEY = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    private readonly endpoints = {
        'listBanks': '/bank',
        'validateAccount': '/bank/resolve',
    }
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async listBanks(command: ListBanksCommand) {
        const url = `${this.baseUrl}${this.endpoints.listBanks}`;
        const headers = {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
        };
        const response = this.httpService.get(url, { headers, params: command })
        const { data } = await lastValueFrom(response);
        return data;
    }

    async validateAccount(command: ValidateAccountCommand) {
        const url = `${this.baseUrl}${this.endpoints.validateAccount}`;
        const headers = {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
        };
        const params = {
            account_number: command.accountNumber,
            bank_code: command.bankCode,
        };
        const response = this.httpService.get(url, { headers, params })
        const { data } = await lastValueFrom(response);
        return data;
    }
}