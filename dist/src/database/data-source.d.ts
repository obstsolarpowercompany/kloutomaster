import { DataSource } from 'typeorm';
declare const dataSource: DataSource;
export declare function initializeDataSource(): Promise<DataSource>;
export default dataSource;
