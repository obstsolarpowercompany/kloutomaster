import { ICommand } from "@modules/shared/application/command/base.command";

export class ValidateAccountCommand implements ICommand {
    bankCode: string;
    accountNumber: string;

    constructor(opts: Partial<ValidateAccountCommand>) {
      Object.assign(this, opts);
    }
}
    