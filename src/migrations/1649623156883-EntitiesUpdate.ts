import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesUpdate1649623156883 implements MigrationInterface {
    name = 'EntitiesUpdate1649623156883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "locations"
            ADD "preview_src" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "locations" DROP COLUMN "preview_src"
        `);
    }

}
