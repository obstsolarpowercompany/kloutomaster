import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../../../user/domain/entities/user.entity";
import { AbstractBaseEntity } from "../../../shared/infrastructure/domain/base.entity";
// import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

@Entity({ name: "wallets" })
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp without time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  updated_at: Date;

  @Column({
    type: "numeric",
    precision: 19,
    scale: 4,
    default: 0,
    nullable: false,
  })
  balance: number;

  @Column({
    type: "varchar",
    unique: true,
    nullable: false,
  })
  account_number: string;

  @Column({
    type: "uuid",
    name: "userId",
    nullable: true,
  })
  userId: string;

  @OneToOne(() => User, (user) => user.wallet, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  // Uncomment if you have transactions in your database
  // @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  // transactions: Transaction[];
}
