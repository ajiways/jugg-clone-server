import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntityUpdate21649621134909 implements MigrationInterface {
    name = 'UserEntityUpdate21649621134909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "fatigue" integer NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "fatigue"
        `);
    }

}
