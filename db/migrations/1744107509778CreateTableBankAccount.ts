import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBankAccount1744107509778 implements MigrationInterface {
  name = "CreateBankAccount1744107509778";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "bank_accounts" (
                "id" SERIAL NOT NULL,
                "userId" uuid NOT NULL,
                "account_holder_name" character varying NOT NULL,
                "account_number" character varying NOT NULL,
                "bank_name" character varying NOT NULL,
                "is_verified" boolean NOT NULL DEFAULT false,
                "is_default" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_bank_accounts_id" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bank_accounts"`);
  }
}
