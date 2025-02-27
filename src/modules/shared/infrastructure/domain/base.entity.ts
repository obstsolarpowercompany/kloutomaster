import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class AbstractBaseEntity {
    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}