import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesUpdate21649624102455 implements MigrationInterface {
    name = 'EntitiesUpdate21649624102455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources"
            ADD "time_to_gather" integer NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources" DROP COLUMN "time_to_gather"
        `);
    }

}
