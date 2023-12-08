import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Bank } from "./model/Bank";
import { Currency } from "./model/Currency";
import { Account } from "./model/Account";

dotenv.config();

export const DB = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql-db',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'foobar',
  database: process.env.DB_NAME || 'bankdb',
  entities: [Bank, Currency, Account],
});

DB.initialize()
  .then(() => {
    console.log({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Bank, Currency, Account],
    })
    console.log("Data Source has been initialized!")
  })
  .catch((err) => console.error("Error during Data Source initialization", err));
