import { AbstractBaseEntity } from "../../../shared/infrastructure/domain/base.entity";
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "./user.entity"; // Assuming you have a User entity

@Entity()
export class OTP extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email: string;

  @Column({ type: 'text' })
  otp_code: string;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'timestamp', nullable: true })
  expiry: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
