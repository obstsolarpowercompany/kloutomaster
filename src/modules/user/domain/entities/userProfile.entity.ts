import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { AbstractBaseEntity } from '@shared/infrastructure/domain/base.entity';
import { BankAccountEntity } from '@modules/bank-account/domain/entities/bank-account.entity';

@Entity()
export class UserProfile extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @ManyToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  production_name: string;

  @Column({ nullable: true, default: false })
  is_creator: boolean;

  @Column({ nullable: true, default: false })
  onboarded: boolean;

  @Column({ nullable: false, default: false })
  is_verified: boolean;

  @Column({ type: 'int', default: 0 })
  number_of_posts: number;

  @Column({ type: 'int', default: 0 })
  number_of_videos: number;

  @Column({ type: 'int', default: 0 })
  number_of_followers: number;

  @Column({ type: 'int', default: 0 })
  number_of_following: number;

  @OneToOne(() => User, (user) => user.profile)
  user_id: User;

  @OneToMany(() => BankAccountEntity, (bankAccount) => bankAccount.userId)
  bankAccounts: BankAccountEntity[];
}
