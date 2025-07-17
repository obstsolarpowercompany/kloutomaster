import { AbstractBaseEntity } from "../../../shared/infrastructure/domain/base.entity";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity"; // Assuming you have a User entity

@Entity()
export class OTP {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: "text" })
  otp_code: string;

  @Column({ type: "int", default: 0 })
  attempts: number;

  @Column({ type: "timestamp", nullable: true })
  expiry: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ type: "timestamp without time zone" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  updated_at: Date;
}
