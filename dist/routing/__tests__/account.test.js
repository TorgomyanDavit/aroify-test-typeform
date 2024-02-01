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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index"); // Adjust the path based on your project structure
const dbInitialize_1 = require("../../dbInitialize");
const Account_1 = require("../../model/Account");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbInitialize_1.DB.initialize();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbInitialize_1.DB.close();
}));
describe('Account Route', () => {
    describe('get acounts as bank id', () => {
        test('should fetch accounts for a bank', () => __awaiter(void 0, void 0, void 0, function* () {
            const bankId = 1;
            const response = yield (0, supertest_1.default)(index_1.app).get(`/accounts/${bankId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('message', 'Bank found');
            expect(response.body).toHaveProperty('data');
        }));
        test('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
            const nonExistentIdType = 'string';
            const response = yield (0, supertest_1.default)(index_1.app).get(`/accounts/${nonExistentIdType}`);
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('message', 'Internal server error');
        }));
    });
    describe('create acount logic', () => {
        test('should create a new account', () => __awaiter(void 0, void 0, void 0, function* () {
            const requestBody = {
                accountNumber: '678959',
                accountName: 'xzZX',
                bankName: 'Ameria Bank',
                currency: 'USD',
            };
            const response = yield (0, supertest_1.default)(index_1.app).post('/create').send(requestBody);
            expect(response.status).toBe(404);
            const newAccount = yield dbInitialize_1.DB.manager.findOne(Account_1.Account, {
                where: { accountNumber: '678959' },
            });
            expect(newAccount).toBeDefined();
            expect(newAccount === null || newAccount === void 0 ? void 0 : newAccount.accountName).toBe('xzZX');
        }));
    });
});
