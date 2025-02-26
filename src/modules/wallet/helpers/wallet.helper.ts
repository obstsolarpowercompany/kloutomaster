import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

export async function generateAccountNumber(walletRepo: Repository<Wallet>): Promise<string> {
  let accountNumber: string;
  let exists: Wallet | null;

  do {
    const prefix = '10'; // Example: Nigerian bank numbers often start with specific digits
    const randomDigits = Math.floor(1000000000 + Math.random() * 9000000000).toString().slice(0, 8);
    accountNumber = prefix + randomDigits;

    // Check if the generated account number already exists
    exists = await walletRepo.findOne({ where: { account_number: accountNumber } });
  } while (exists); // Retry until a unique number is generated

  return accountNumber;
}
