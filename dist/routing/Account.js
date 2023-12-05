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
const express_1 = __importDefault(require("express"));
const addFunction_1 = require("../utils/addFunction");
const Currency_1 = require("../model/Currency");
const typeOrm_1 = require("../typeOrm");
const Bank_1 = require("../model/Bank");
const Account_1 = require("../model/Account");
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountNumber, accountName, bankName, currency } = req.body;
    const { countryOrigin, isoCode, signCharacter } = (0, addFunction_1.getCurrency)(currency);
    let currensyId;
    function AddNewCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield typeOrm_1.DB.createQueryBuilder().insert().into(Currency_1.Currency)
                .values({
                isoCode: isoCode,
                countryOrigin: countryOrigin,
                signCharacter: signCharacter,
            })
                .execute();
            currensyId = row.identifiers[0].currency_id;
        });
    }
    function AddAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            const findBankId = yield typeOrm_1.DB.manager.findOne(Bank_1.Bank, { where: { bankName: bankName } });
            const newAccount = yield typeOrm_1.DB.createQueryBuilder().insert().into(Account_1.Account)
                .values({
                accountNumber: accountNumber,
                accountName: accountName,
                bank_id: findBankId === null || findBankId === void 0 ? void 0 : findBankId.bank_id,
                currency_id: currensyId,
            })
                .execute();
        });
    }
    try {
        const IsoCode = yield typeOrm_1.DB.manager.findOne(Currency_1.Currency, { where: { isoCode: isoCode } });
        if (!IsoCode) {
            yield AddNewCurrency();
            yield AddAccount();
        }
        else {
            currensyId = IsoCode.currency_id;
            yield AddAccount();
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.send({ success: true, message: 'account created' });
}));
router.get("/:bankId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bankId = parseInt(req.params.bankId, 10);
        if (isNaN(bankId)) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        const accounnts = yield typeOrm_1.DB.manager.find(Account_1.Account, {
            where: { bank_id: bankId }
        });
        if (!accounnts) {
            return res.status(500).json({ success: false, message: 'Bank not found' });
        }
        return res.status(200).json({ success: true, message: 'Bank found', data: accounnts });
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}));
exports.default = router;
