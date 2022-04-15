import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesUpdate31649624169765 implements MigrationInterface {
    name = 'EntitiesUpdate31649624169765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources"
            ADD "chance_to_gather" integer NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources" DROP COLUMN "chance_to_gather"
        `);
    }

}
