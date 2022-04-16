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

  const MODE = config.get('NODE_ENV');

  if (MODE === 'dev')
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
    };

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
    ssl: {
      requestCert: true,
      rejectUnauthorized: false,
    },
    migrationsRun: true,
  };
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
