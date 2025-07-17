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
  UpdateDateColumn,
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
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp without time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  updated_at: Date;

  @Column({
    type: "varchar",
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  status: string;

  @Column({
    type: "boolean",
    nullable: true,
    default: true,
  })
  is_active: boolean;

  @DeleteDateColumn({
    type: "timestamp without time zone",
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    type: "varchar",
    nullable: true,
    default: "user",
  })
  user_type: string;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  is_verified: boolean;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  is_creator: boolean;

  @Column("text", {
    array: true,
    nullable: true,
  })
  interests: string[];

  // Relationships (keep these as they are)
  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  profile: UserProfile;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.userId)
  bankAccounts: BankAccountEntity[];

  @OneToMany(() => Follower, (follower) => follower.follower)
  followers: Follower[];

  @OneToMany(() => Follower, (follower) => follower.followee)
  following: Follower[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  two_factor_secret: string;

  @Column({ type: "boolean", default: false })
  two_factor_enabled: boolean;

  @Column({ type: "timestamp", nullable: true })
  two_factor_enabled_at: Date;

  @Column({ type: "json", nullable: true })
  two_factor_backup_codes: string[];
}
