// import * as bcrypt from 'bcryptjs';
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
import { AbstractBaseEntity } from "../../../entities/base.entity";
import { UserProfile } from "./userProfile.entity";
import { Follower } from "../../following/entities/following.entity";
import { RefreshToken } from "./refreshToken.entity";
import { Wallet } from "../../wallet/entities/wallet.entity";
// import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';

export enum UserType {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  USER = "user",
}

@Entity({ name: "users" })
export class User extends AbstractBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: true })
  status: string;

  // @Column({ nullable: true })
  // phone: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @Column({ nullable: true, default: false })
  is_verified: boolean;

  @Column({ nullable: true, default: false })
  is_creator: boolean;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  profile: UserProfile;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true, default: UserType.USER })
  user_type: string;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  // @OneToMany(() => BankAccount, (bankAccount) => bankAccount.user)
  // bankAccounts: BankAccount[];

  @OneToMany(() => Follower, (follower) => follower.follower)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.followee)
  following: Follower[];

  @Column("text", { array: true, nullable: true })
  interests: string[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
