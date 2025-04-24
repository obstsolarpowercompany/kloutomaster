import { User } from '../../src/modules/user/domain/entities/user.entity';
import { Wallet } from 'src/modules/wallet/domain/entities/wallet.entity';
import { UserProfile } from 'src/modules/user/domain/entities/userProfile.entity';
import { BankAccountEntity } from '@modules/bank-account/domain/entities/bank-account.entity';

export const mockUser: User = {
  id: 'user1',
  email: 'john@example.com',
  is_active: true,
  is_verified: true,
  is_creator: true,
  status: 'active',
  user_type: 'user',
  profile: {} as UserProfile,
  followers: [],
  following: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  interests: [],
  refreshTokens: [],
  wallet: new Wallet(),
  bankAccounts: [new BankAccountEntity()],
};
