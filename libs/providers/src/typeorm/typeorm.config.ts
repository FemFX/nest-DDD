import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { PostEntity } from '@lib/entities';

config({ path: join(process.cwd(), '.env') });

const configService = new ConfigService();

const options = (): DataSourceOptions => {
  const url = configService.get('DATABASE_URL');

  if (!url) {
    throw new Error('Database URL im empty');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get('IS_PROD') === 'false',
    entities: [PostEntity],
    synchronize: true,
    // migrations: [
    //   join(process.cwd(), 'migrations', '**', '*.migration.{ts, js}'),
    // ],
    // migrationsRun: true,
    // migrationsTableName: 'migrations',
  };
};

export const appDataSource = new DataSource(options());
