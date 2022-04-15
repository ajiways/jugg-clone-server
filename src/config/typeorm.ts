import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from 'dotenv';
import { parse } from 'pg-connection-string';
config();

export function getOrmConfig(): TypeOrmModuleOptions {
  const config = new ConfigService();

  const { host, password, user, port, database } = parse(
    config.get('DATABASE_URL'),
  );

  return {
    type: 'postgres',
    host,
    port: Number(port),
    username: user,
    password,
    database,
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    migrations: [`${__dirname}/../migrations/*.{ts,js}`],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
    logging: 'all',
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsRun: true,
    ssl: {
      requestCert: true,
      rejectUnauthorized: false,
    },
  };
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
