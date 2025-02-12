"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDataSource = initializeDataSource;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const NODE_ENV = 'development';
const isDevelopment = process.env.NODE_ENV === 'development';
const sslOption = process.env.DB_SSL || false;
const dataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    entities: [process.env.DB_ENTITIES],
    migrations: [process.env.DB_MIGRATIONS],
    synchronize: isDevelopment,
    migrationsTableName: 'migrations',
    ssl: sslOption === 'require' ? { rejectUnauthorized: false } : sslOption === 'true',
});
async function initializeDataSource() {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    return dataSource;
}
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map