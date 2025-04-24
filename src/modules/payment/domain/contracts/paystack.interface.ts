import { ValidateAccountCommand } from "@modules/payment/accounts/application/use-cases/validate-account.command";
import { ListBanksCommand } from "../../accounts/application/use-cases/list-banks-command";

export interface IPaystackService {
    listBanks(command: ListBanksCommand): Promise<any>;
    validateAccount(command: ValidateAccountCommand): Promise<any>;
}