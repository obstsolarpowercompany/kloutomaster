import { ICommand } from "@modules/shared/application/command/base.command";
import { PaginationDTO } from "@modules/shared/dto/pagination.dto";
import { IsUUID } from "class-validator";

export class ListBankAccountsCommand extends PaginationDTO implements ICommand {
    @IsUUID()
    userId: string;

    constructor(opts: Partial<ListBankAccountsCommand>) {
        super()
        Object.assign(this, opts);
    }
}
