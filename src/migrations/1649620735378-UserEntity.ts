import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1649620735378 implements MigrationInterface {
    name = 'UserEntity1649620735378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "mastery" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
