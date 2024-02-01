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
const dbInitialize_1 = require("../dbInitialize");
const Bank_1 = require("../model/Bank");
const redisdbinitialize_1 = require("../redisdbinitialize");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisdbinitialize_1.redisClient.get("name");
        console.log(data);
        const foundBank = yield dbInitialize_1.DB.manager.find(Bank_1.Bank);
        return res.send({ success: true, message: 'Banks found', data: foundBank });
    }
    catch (error) {
        console.error('Error fetching banks:', error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
}));
exports.default = router;
