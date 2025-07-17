import { IBankAccountRepository } from "../../domain/contracts/bank-account.repository";
import { BankAccountEntity } from "../../domain/entities/bank-account.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ListBankAccountsCommand } from "@modules/bank-account/application/use-cases/list-bank-accounts.command";
import { CreateBankAccountCommand } from "@modules/bank-account/application/use-cases/create-bank-account.command";
import { PayStackService } from "@modules/payment/application/paystack.service";
import { PAYSTACK } from "@modules/payment/application/injection-tokens/tokens";
import { Inject } from "@nestjs/common";
import { DeleteBankAccountCommand } from "@modules/bank-account/application/use-cases/delete-bank-account.command";
import { UpdateBankAccountCommand } from "@modules/bank-account/application/use-cases/update-bank-account.command";

export class TypeOrmBankAccountRepository implements IBankAccountRepository {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly bankAccountRepository: Repository<BankAccountEntity>,
    @Inject(PAYSTACK)
    private readonly paystackService: PayStackService
  ) {}

  async findAll(command: ListBankAccountsCommand): Promise<BankAccountEntity[]> {
    const { userId, page = 1, perPage = 10 } = command;

    return await this.bankAccountRepository.find({
      where: { userId },
      skip: (+page - 1) * +perPage,
      take: +perPage,
    });
  }

  async getBankAccountById(id: string): Promise<BankAccountEntity> {
    return await this.bankAccountRepository.findOne({
      where: { id },
    });
  }

  async delete(command: DeleteBankAccountCommand) {
    return this.bankAccountRepository.delete({
      id: command.bankAccountId,
      user: {
        id: command.userId,
      },
    });
  }

  async create(command: CreateBankAccountCommand): Promise<BankAccountEntity> {
    // Confirm account details with PayStack
    const accountDetails = await this.paystackService.validateAccount({
      bankCode: command.bankCode,
      accountNumber: command.accountNumber,
    });

    if (!accountDetails) {
      throw new Error("Invalid account details");
    }

    return await this.bankAccountRepository.save({
      is_verified: true,
      account_holder_name: accountDetails.data["account_name"],
      account_number: command.accountNumber,
      bank_name: command.bankName,
      bank_code: command.bankCode,
      user: {
        id: command.userId,
      },
    });
  }

  async update(command: UpdateBankAccountCommand): Promise<BankAccountEntity> {
    const accountDetails = await this.paystackService.validateAccount({
      bankCode: command.bankCode,
      accountNumber: command.accountNumber,
    });

    if (!accountDetails) {
      throw new Error("Invalid account details");
    }
    if (
      command?.accountHolderName &&
      !command.passThrough &&
      command.accountHolderName.toLowerCase() !== accountDetails.data["account_name"].toLowerCase()
    ) {
      throw new Error("Account name mismatch");
    }
    return await this.bankAccountRepository.save({
      id: command.bankAccountId,
      user: {
        id: command.userId,
      },
      bank_name: command.bankName,
      bank_code: command.bankCode,
      account_number: command.accountNumber,
      account_holder_name: accountDetails.data["account_name"],
      is_verified: true,
      is_default: command.isDefault,
    });
  }
}
