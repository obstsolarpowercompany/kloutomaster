import { string } from 'joi';
import { User } from '../../entities/user.entity';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';

export const mockUser: User = {
  id: 'user1',
  email: 'john@example.com',
  is_active: true,
  is_verified: true,
  is_creator: true,
  status: 'active',
  user_type: 'user',
  profile: null,
  followers: [],
  following: [],
  created_at: new Date(),
  updated_at: new Date(),
  interests: [],
  refreshTokens: [],
  wallet: new Wallet(),
  bankAccounts: [],
};
