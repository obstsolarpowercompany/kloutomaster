import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserAddColumns1740734595145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const onboardedExists = await queryRunner.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'user_profile' AND column_name = 'onboarded'`);
        if (!onboardedExists) {
            await queryRunner.query(`ALTER TABLE "user_profile" ADD "onboarded" boolean NOT NULL DEFAULT false`);
        }
        const isVerifiedExists = await queryRunner.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'user_profile' AND column_name = 'is_verified'`);
        if (!isVerifiedExists) {
            await queryRunner.query(`ALTER TABLE "user_profile" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "onboarded"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "is_verified"`);
    }

}
