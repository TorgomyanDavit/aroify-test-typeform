import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.db_host,
  username: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
});

export default sequelize;