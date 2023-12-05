"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Account_1 = __importDefault(require("./routing/Account"));
const Bank_1 = __importDefault(require("./routing/Bank"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
exports.app.use((0, express_session_1.default)({
    // cookie: { expires : new Date(Date.now() + 3600000) },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
exports.app.use((0, cors_1.default)({
    origin: [
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
exports.app.use(express_1.default.static("public"));
exports.app.use("/accounts", Account_1.default);
exports.app.use("/banks", Bank_1.default);
server.listen(process.env.BACKEND_PORT || 8000, () => {
    console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});
