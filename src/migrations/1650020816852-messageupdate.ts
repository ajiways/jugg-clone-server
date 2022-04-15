import {MigrationInterface, QueryRunner} from "typeorm";

export class messageupdate1650020816852 implements MigrationInterface {
    name = 'messageupdate1650020816852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "date" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "date" integer NOT NULL
        `);
    }

}
