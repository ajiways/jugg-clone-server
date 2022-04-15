import {MigrationInterface, QueryRunner} from "typeorm";

export class Entities1649622756537 implements MigrationInterface {
    name = 'Entities1649622756537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "resources" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "mastery_min" integer NOT NULL,
                "mastery_max" integer NOT NULL,
                "fatigue_req" integer NOT NULL,
                "preview_src" character varying NOT NULL,
                "location_id" integer,
                CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "locations" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "mastery_req" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "resources"
            ADD CONSTRAINT "FK_df29bf58969b918e4a7614bc397" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "resources" DROP CONSTRAINT "FK_df29bf58969b918e4a7614bc397"
        `);
        await queryRunner.query(`
            DROP TABLE "locations"
        `);
        await queryRunner.query(`
            DROP TABLE "resources"
        `);
    }

}
