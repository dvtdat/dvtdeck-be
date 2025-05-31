import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'dvtdeck',
  host: 'localhost',
  port: 5432,
  user: 'dvtdat',
  password: '12345678',
  driver: PostgreSqlDriver,
};

export default config;
