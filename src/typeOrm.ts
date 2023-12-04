import { DataSource } from "typeorm"
import dotenv from 'dotenv';
import { Bank } from "./model/Bank";
import { Currency } from "./model/Currency";
import { Account } from "./model/Account";
dotenv.config();


export const DB = new DataSource({
  type: 'mysql',
  host: process.env.db_host || 'localhost',
  port: 3306,
  username: process.env.db_user || 'your_username',
  password: process.env.db_password || 'your_password',
  database: process.env.db_name || 'your_database_name',
  entities: [Bank,Currency,Account]
})

DB.initialize()
  .then(() => console.log("Data Source has been initialized!"))
  .catch((err) => console.error("Error during Data Source initialization", err))
