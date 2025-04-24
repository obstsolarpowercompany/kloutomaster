import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnBankCode1744272955084 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns 
                WHERE table_name='bank_accounts' AND column_name='bank_code'
              ) THEN
                ALTER TABLE "bank_accounts" ADD COLUMN "bank_code" text;
              END IF;
            END
            $$;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "bank_accounts" DROP COLUMN IF EXISTS "bank_code";
          `);
  }
}
