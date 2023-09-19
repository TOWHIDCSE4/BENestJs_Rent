import { MigrationInterface, QueryRunner } from "typeorm";

export class updateCustomerNotNullEmail1691393549840 implements MigrationInterface {
    name = 'updateCustomerNotNullEmail1691393549840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "email" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
