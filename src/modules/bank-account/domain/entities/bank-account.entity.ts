import { UserProfile } from '@modules/user/domain/entities/userProfile.entity';
import { AbstractBaseEntity } from '@shared/infrastructure/domain/base.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
@Entity({ name: 'bank_accounts' })
export class BankAccountEntity extends AbstractBaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => UserProfile, (userProfile) => userProfile.bankAccount)
    @JoinColumn({ referencedColumnName: 'id' })
    public userId: string;

    @Column()
    public account_holder_name: string;

    @Column({ nullable: false })
    public account_number: string;

    @Column()
    public bank_name: string;

    @Column({ default: false })
    public is_verified: boolean;

    @Column({ default: false })
    public is_default: boolean;
}