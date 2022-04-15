import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageEntity1650020062273 implements MigrationInterface {
    name = 'MessageEntity1650020062273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "messages" (
                "id" SERIAL NOT NULL,
                "author" character varying NOT NULL,
                "content" character varying NOT NULL,
                "date" integer NOT NULL,
                CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "messages"
        `);
    }

}
