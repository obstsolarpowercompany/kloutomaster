import { ICommand } from "@modules/shared/application/command/base.command";
import { IsString, IsUUID } from "class-validator";

export class CreateBankAccountCommand implements ICommand {
  @IsString()
  accountHolderName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  bankName: string;

  @IsString()
  bankCode: string;

  @IsUUID()
  userId: string;

  constructor(opts: Partial<CreateBankAccountCommand>) {
    Object.assign(this, opts);
  }
}
