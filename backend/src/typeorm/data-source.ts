import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'dev',
  password: 'password',
  database: 'dbtopmed',
  entities: ['dist/typeorm/entities/*.js'],
  synchronize: true,
  migrations: ['dist/typeorm/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
