"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Bank_1 = require("./model/Bank");
const Currency_1 = require("./model/Currency");
const Account_1 = require("./model/Account");
dotenv_1.default.config();
exports.DB = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.db_host || 'localhost',
    port: 3306,
    username: process.env.db_user || 'your_username',
    password: process.env.db_password || 'your_password',
    database: process.env.db_name || 'your_database_name',
    entities: [Bank_1.Bank, Currency_1.Currency, Account_1.Account],
});
exports.DB.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization", err));
