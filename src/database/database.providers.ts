import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_ROOT_NAME,
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_LOCAL_PORT),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
  },
];
