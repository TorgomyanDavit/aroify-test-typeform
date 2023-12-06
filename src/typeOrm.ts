import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Bank } from "./model/Bank";
import { Currency } from "./model/Currency";
import { Account } from "./model/Account";

dotenv.config();

export const DB = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'foobar',
  database: process.env.DB_NAME || 'bankdb',
  entities: [Bank, Currency, Account],
});

DB.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization", err));
