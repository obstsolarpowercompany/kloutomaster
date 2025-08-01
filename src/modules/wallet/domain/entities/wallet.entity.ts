import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import { AbstractBaseEntity } from '../../../shared/infrastructure/domain/base.entity';
// import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

@Entity({ name: 'wallets' })
export class Wallet extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ unique: true })
  account_number: string;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  // transactions: Transaction[];
}
