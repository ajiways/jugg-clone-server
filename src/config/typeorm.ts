import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export function getOrmConfig(): TypeOrmModuleOptions {
  const config = new ConfigService();

  return {
    type: 'postgres',
    host: config.get('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get('DB_USER'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_NAME'),
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
    logging: 'all',
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsRun: true,
  };
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
