import { ICommand } from "@modules/shared/application/command/base.command";
import { IsString, IsUUID } from "class-validator";

export class DeleteBankAccountCommand implements ICommand {
  @IsString()
  bankAccountId: string;

  @IsUUID()
  userId: string;

  constructor(opts: Partial<DeleteBankAccountCommand>) {
    Object.assign(this, opts);
  }
}
