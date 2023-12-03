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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeOrm_1 = require("./typeOrm");
const Account_1 = require("./model/Account");
const Currency_1 = require("./model/Currency");
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
exports.app.use(express_1.default.static("public"));
exports.app.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const person = yield typeOrm_1.DB.manager.find(Account_1.Account);
    return res.send({ success: true, message: person });
}));
exports.app.get("/createAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        bankName: "string",
        accountNumber: "string",
        currency: {
            isoCode: "AMD",
            countryOrigin: "Armenia",
            signCharacter: "֏"
        },
        accountName: "Davit"
    };
    try {
        const IsoCode = yield typeOrm_1.DB.manager.findOne(Currency_1.Currency, { where: { isoCode: body.currency.isoCode } });
        if (!IsoCode) {
            const newCurrency = new Currency_1.Currency();
            newCurrency.isoCode = body.currency.isoCode;
            newCurrency.countryOrigin = body.currency.countryOrigin;
            newCurrency.signCharacter = body.currency.signCharacter;
            yield typeOrm_1.DB.manager.save(newCurrency);
            console.log('New currency added:', newCurrency);
        }
        else {
            console.log('currency already exist');
        }
        console.log(IsoCode === null || IsoCode === void 0 ? void 0 : IsoCode.countryOrigin);
    }
    catch (err) {
        console.log(err);
    }
    return res.send({ success: true, message: 'person' });
}));
server.listen(process.env.BACKEND_PORT || 8000, () => {
    console.log(`PORT work -> ${process.env.BACKEND_PORT}`);
});
