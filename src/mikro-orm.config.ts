import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: process.env.DATABASE_NAME ?? 'admin',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '') ?? 5432,
  user: process.env.DATABASE_USER ?? 'admin',
  password: process.env.DATABASE_PASSWORD ?? '',
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: process.env.NODE_ENV !== 'production',
  extensions: [Migrator],
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    emit: 'ts' as const,
  },
};

export default config;
