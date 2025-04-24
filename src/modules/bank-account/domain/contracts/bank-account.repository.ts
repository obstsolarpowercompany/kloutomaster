import { ListBankAccountsCommand } from "@modules/bank-account/application/use-cases/list-bank-accounts.command";
import { BankAccountEntity } from "../entities/bank-account.entity";
import { CreateBankAccountCommand } from "@modules/bank-account/application/use-cases/create-bank-account.command";
import { DeleteBankAccountCommand } from "@modules/bank-account/application/use-cases/delete-bank-account.command";
import { UpdateBankAccountCommand } from "@modules/bank-account/application/use-cases/update-bank-account.command";

export interface IBankAccountRepository {
    findAll(command: ListBankAccountsCommand): Promise<BankAccountEntity[]>;
    getBankAccountById(id: number): Promise<BankAccountEntity>;
    create(command: CreateBankAccountCommand): Promise<BankAccountEntity>;
    delete(command: DeleteBankAccountCommand): void;
    update(command: UpdateBankAccountCommand): Promise<BankAccountEntity>;
}