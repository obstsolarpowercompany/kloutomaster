import { ICommand } from "@modules/shared/application/command/base.command";
import { IsUUID } from "class-validator";

export class GetWalletByUserCommand implements ICommand {
    @IsUUID()
    userId: string;

    constructor(schema: Partial<GetWalletByUserCommand>) {
        Object.assign(this, schema);
    }
}