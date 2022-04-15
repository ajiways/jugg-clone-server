import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntityUpdate1649620976125 implements MigrationInterface {
    name = 'UserEntityUpdate1649620976125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "mastery_cap" integer NOT NULL DEFAULT '60'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "mastery_cap"
        `);
    }

}
