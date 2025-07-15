import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AbstractBaseEntity } from "../../../shared/infrastructure/domain/base.entity";
import { UserProfile } from "./userProfile.entity";
import { Follower } from "../../../following/domain/entities/following.entity";
import { RefreshToken } from "./refreshToken.entity";
import { Wallet } from "../../../wallet/domain/entities/wallet.entity";
import { BankAccountEntity } from "../../../bank-account/domain/entities/bank-account.entity";

export enum UserType {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: "users" })
export class User extends AbstractBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: false, nullable: true })
  status: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @Column({ nullable: true, default: false })
  is_verified: boolean;

  @Column({ nullable: true, default: false })
  is_creator: boolean;

  @Column({ nullable: true })
  two_factor_secret: string;

  @Column({ type: "boolean", default: false })
  two_factor_enabled: boolean;

  @Column({ type: "timestamp", nullable: true })
  two_factor_enabled_at: Date;

  @Column({ type: "json", nullable: true })
  two_factor_backup_codes: string[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  profile: UserProfile;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true, default: UserType.USER })
  user_type: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.userId)
  bankAccounts: BankAccountEntity[];

  @OneToMany(() => Follower, (follower) => follower.follower)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.followee)
  following: Follower[];

  @Column("text", { array: true, nullable: true })
  interests: string[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
