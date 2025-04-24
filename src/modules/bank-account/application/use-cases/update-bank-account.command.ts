import { ICommand } from "@modules/shared/application/command/base.command";

export class UpdateBankAccountCommand implements ICommand {
  userId: string;
  bankAccountId: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  passThrough: boolean;
  bankCode: string;
  isVerified: boolean;
  isDefault: boolean;

  constructor(opts: Partial<UpdateBankAccountCommand>) {
    Object.assign(this, opts);
  }
}
