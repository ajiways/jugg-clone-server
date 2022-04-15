import {MigrationInterface, QueryRunner} from "typeorm";

export class messageupdate21650021451729 implements MigrationInterface {
    name = 'messageupdate21650021451729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "messages" DROP COLUMN "created_at"
        `);
    }

}
