import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { AbstractBaseEntity } from "@shared/infrastructure/domain/base.entity";
import { BankAccountEntity } from "@modules/bank-account/domain/entities/bank-account.entity";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  first_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  last_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar_url: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "int", default: 0, nullable: false })
  number_of_posts: number;

  @Column({ type: "int", default: 0, nullable: false })
  number_of_videos: number;

  @Column({ type: "int", default: 0, nullable: false })
  number_of_followers: number;

  @Column({ type: "int", default: 0, nullable: false })
  number_of_following: number;

  @UpdateDateColumn({ type: "timestamp without time zone", nullable: false })
  updated_at: Date;

  @Column({ type: "varchar", nullable: true })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "varchar", nullable: true })
  age: string;

  @Column({ type: "varchar", nullable: true })
  production_name: string;

  @Column({ type: "boolean", nullable: true, default: false })
  is_creator: boolean;

  @Column({ type: "boolean", nullable: true, default: false })
  onboarded: boolean;

  @Column({ type: "boolean", nullable: true, default: false })
  is_verified: boolean;

  @CreateDateColumn({ type: "time without time zone", nullable: false })
  created_at: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "uuid", name: "user_id", nullable: true })
  user_id: string;

  @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.user)
  bankAccounts: BankAccountEntity[];
}
