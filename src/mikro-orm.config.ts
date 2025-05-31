import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'dvtdeck',
  host: 'localhost',
  port: 5432,
  user: 'dvtdat',
  password: '12345678',
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  extensions: [Migrator],
  migrations: {
    path: './migrations',
    pathTs: './migrations',
    emit: 'ts' as const,
  },
};

export default config;
