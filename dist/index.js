"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const promise_1 = require("mysql2/promise");
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = (0, promise_1.createPool)({
    host: process.env.db_host, // Replace with your host name
    user: process.env.db_user, // Replace with your root name
    password: process.env.db_password, // Replace with your database password
    database: process.env.db_name, // Replace with your database Name
    multipleStatements: true
});
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
// const io = new Server(server, { 
//   cors: { origin: [
//     'http://localhost:3000',// test url
//     'http://localhost:3001'// test url
//   ]}
// });
exports.app.use((0, express_session_1.default)({
    // cookie: { expires : new Date(Date.now() + 3600000) },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
exports.app.use((0, cors_1.default)({
    origin: [
        "https://www.holtrinity.com",
        "https://holtrinity.com",
        'http://localhost:3000',
        'http://localhost:4000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use("/public/images", express_1.default.static("./public/images"));
exports.app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows, fields] = yield exports.pool.query('SELECT * FROM employees');
    return res.send({ success: true, message: "" });
}));
server.listen(process.env.BACKEND_PORT || 8000, () => {
    console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});
