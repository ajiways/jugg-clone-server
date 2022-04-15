import { MigrationInterface, QueryRunner } from 'typeorm';

export class contentSeed1650010426787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Поляна', 'Альфа версия хули', '0', 'None');
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Пустырь', 'Альфа версия хули', '60', 'None');
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Поля', 'Альфа версия хули', '120', 'None');
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Лес', 'Альфа версия хули', '180', 'None');
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Болото', 'Альфа версия хули', '240', 'None');
    INSERT INTO "public"."locations" ("title", "description", "mastery_req", "preview_src") VALUES ('Кладбище', 'Альфа версия хули', '300', 'None');`);

    queryRunner.query(`
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Трава', 'Просто трава', '0', '32', '5', 'None', '1', '100', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Одуванчик', 'Просто одуванчик а че)', '30', '62', '8', 'None', '1', '200', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Редкая трава', 'Сложно добыть 0_0', '0', '62', '10', 'None', '1', '100', '0.5');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Засохшая трава', 'Просто колючка', '60', '92', '11', 'None', '2', '350', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Крапива хз', 'а че)', '90', '120', '12', 'None', '2', '400', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Пшеница', 'Просто пшеница', '120', '152', '13', 'None', '3', '410', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('картощька)', 'амогус', '150', '180', '15', 'None', '3', '420', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Грибочек', 'Просто грибочек', '180', '210', '16', 'None', '4', '440', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Грибочек покруче', 'Просто грибочек, но покруче', '210', '240', '18', 'None', '4', '500', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Мох', 'Просто мох (зеленый)', '240', '272', '20', 'None', '5', '550', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Болотная трава', 'Оригинально', '270', '300', '21', 'None', '5', '520', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Могильный мох', 'страшилка', '300', '330', '22', 'None', '5', '600', '1');
    INSERT INTO "public"."resources" ("title", "description", "mastery_min", "mastery_max", "fatigue_req", "preview_src", "location_id", "time_to_gather", "chance_to_gather") VALUES ('Плесень', 'хайлвл ресурс блин', '330', '360', '30', 'None', '5', '620', '0.9');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //lazy.....
  }
}
