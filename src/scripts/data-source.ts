import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const sslOption = process.env.DB_SSL || false;
const relativePath = path.join(path.relative('.', __dirname), '..');

const dataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [process.env.DB_ENTITIES],
  migrations: [`${relativePath}/../db/migrations/*.ts`],
  synchronize: false,
  migrationsTableName: 'migrations',
  ssl: sslOption === 'require' ? { rejectUnauthorized: false } : sslOption === 'true',
});
export async function initializeDataSource() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
}

export default dataSource;
