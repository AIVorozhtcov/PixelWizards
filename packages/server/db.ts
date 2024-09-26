import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';
import { seedThemes } from './models/theme';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '..', '..', '.env') });

const sequelizeOptions: SequelizeOptions = {
  database: process.env.POSTGRES_DB as string,
  dialect: 'postgres',
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
};
export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync({ alter: true }).then(async () => {
      await seedThemes();
    });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
