import { MigrationInterface, QueryRunner } from "typeorm";

export class initAuthCustomer1691392833461 implements MigrationInterface {
    name = 'initAuthCustomer1691392833461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "key" character varying, "url" character varying, "type" character varying NOT NULL, "size" integer NOT NULL DEFAULT '0', "uploader_id" integer NOT NULL, CONSTRAINT "CHK_15c14cea9673d2cfe109664615" CHECK (
  (
    COALESCE((key IS NOT NULL)::INTEGER, 0)
    +
    COALESCE((url IS NOT NULL)::INTEGER, 0)
  ) = 1
  ), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d2df77c0cbda74ee650020d9e1" ON "file" ("key") WHERE deleted_at is null`);
        await queryRunner.query(`CREATE TYPE "public"."customer_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TYPE "public"."customer_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TABLE "customer" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "email" character varying(255), "name" character varying(50), "birth_date" TIMESTAMP WITH TIME ZONE, "status" "public"."customer_status_enum" NOT NULL DEFAULT 'ACTIVE', "password" character varying(255) NOT NULL, "user_id" integer NOT NULL, "gender" "public"."customer_gender_enum", "avatar_id" integer, CONSTRAINT "REL_5d1f609371a285123294fddcf3" UNIQUE ("user_id"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9967869264f16d09a571fced71" ON "customer" ("email") WHERE deleted_at is null`);
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('CUSTOMER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL DEFAULT '1', "id" SERIAL NOT NULL, "type" "public"."user_type_enum" NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_96519432f789c1624978f27ffca" FOREIGN KEY ("uploader_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_0739aa1a4092057b22710e1ec6d" FOREIGN KEY ("avatar_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_0739aa1a4092057b22710e1ec6d"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_96519432f789c1624978f27ffca"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9967869264f16d09a571fced71"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TYPE "public"."customer_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."customer_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2df77c0cbda74ee650020d9e1"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
