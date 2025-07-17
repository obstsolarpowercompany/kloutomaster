import { User } from "@modules/user/domain/entities/user.entity";
import { AbstractBaseEntity } from "@shared/infrastructure/domain/base.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "bank_accounts" })
export class BankAccountEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn({ type: "timestamp without time zone" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  public updated_at: Date;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  public account_holder_name: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  public account_number: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  public bank_name: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
  })
  public bank_code: string;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  public is_verified: boolean;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  public is_default: boolean;

  @Column({
    type: "uuid",
    name: "userId",
    nullable: true,
  })
  public userId: string;

  @ManyToOne(() => User, (userProfile) => userProfile.bankAccounts)
  @JoinColumn({ name: "userId" })
  public user: User;
}
