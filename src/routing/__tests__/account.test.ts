import request from 'supertest';
import { app } from '../../index'; // Adjust the path based on your project structure
import { DB } from '../../dbInitialize';
import { Account } from '../../model/Account';

beforeAll(async () => {
    await DB.initialize();
});

afterAll(async () => {
    await DB.close();
});

describe('Account Route', () => {
    describe('get acounts as bank id', () => {
        test('should fetch accounts for a bank', async () => {
            const bankId = 1;
            const response = await request(app).get(`/accounts/${bankId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('message', 'Bank found');
            expect(response.body).toHaveProperty('data');
        });
    
        test('should handle internal server error', async () => {
            const nonExistentIdType = 'string';
            const response = await request(app).get(`/accounts/${nonExistentIdType}`);
        
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('message', 'Internal server error');
        });
    })

    describe('create acount logic', () => {
        test('should create a new account', async () => {
            const requestBody = {
                accountNumber: '678959',
                accountName: 'xzZX',
                bankName: 'Ameria Bank',
                currency: 'USD',
            };

            const response = await request(app).post('/create').send(requestBody);
            expect(response.status).toBe(404);
    
            const newAccount = await DB.manager.findOne(Account, {
                where: { accountNumber: '678959' },
            });
    
            expect(newAccount).toBeDefined();
            expect(newAccount?.accountName).toBe('xzZX');
        });
    });
});
