import { User } from "../../src/modules/user/domain/entities/user.entity";
import { Wallet } from "src/modules/wallet/domain/entities/wallet.entity";
import { UserProfile } from "src/modules/user/domain/entities/userProfile.entity";
import { BankAccountEntity } from "@modules/bank-account/domain/entities/bank-account.entity";

export const mockUser: User = {
  id: "user1",
  email: "john@example.com",
  username: "johnexample",
  phone: "+234567890123",
  is_active: true,
  is_verified: true,
  is_creator: true,
  status: "active",
  user_type: "user",
  profile: {} as UserProfile,
  followers: [],
  following: [],
  // createdAt: new Date(),
  // updatedAt: new Date(),
  two_factor_backup_codes: [],
  two_factor_enabled_at: new Date(),
  two_factor_enabled: false,
  two_factor_secret: "",
  interests: [],
  refreshTokens: [],
  wallet: new Wallet(),
  bankAccounts: [new BankAccountEntity()],
  created_at: new Date(),
  updated_at: new Date(),
  deletedAt: null,
};
