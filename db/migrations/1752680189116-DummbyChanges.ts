import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * @NOTE This migration every before it, were marked as applied manually on 2025-07-17
 * because the schema changes were already present in production
 * Actual changes were implemented via
 */
export class DummbyChanges1752680189116 implements MigrationInterface {
  name = "DummbyChanges1752680189116";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
    await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user_profile" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id")`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "wallets" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "wallets" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" TYPE numeric(19,4)`);
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    await queryRunner.query(
      `ALTER TABLE "bank_accounts" ADD CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" DROP CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5"`);
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" TYPE numeric(12,2)`);
    await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "wallets" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "wallets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_eee360f3bff24af1b6890765201"`);
    await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user_profile" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(
      `ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
