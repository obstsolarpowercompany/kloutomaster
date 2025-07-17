import { MigrationInterface, QueryRunner } from "typeorm";

export class OTPAuthMods1752718439383 implements MigrationInterface {
    name = 'OTPAuthMods1752718439383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "two_factor_secret" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "two_factor_enabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "two_factor_enabled_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "two_factor_backup_codes" json`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_eee360f3bff24af1b6890765201" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" TYPE numeric(19,4)`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP CONSTRAINT "FK_45ef3ca170943e2c70e8073a7c5"`);
        await queryRunner.query(`ALTER TABLE "otp" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallets" ALTER COLUMN "balance" TYPE numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallets" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "wallets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "created_at" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "bank_accounts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "two_factor_backup_codes"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "two_factor_enabled_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "two_factor_enabled"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "two_factor_secret"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_a000cca60bcf04454e727699490"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
