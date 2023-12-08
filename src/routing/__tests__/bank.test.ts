import request from 'supertest';
import { app } from '../../index'; // Adjust the path based on your project structure
import { DB } from '../../dbInitialize';

beforeAll(async () => {
  await DB.initialize();
});

afterAll(async () => {
  await DB.destroy();
});

describe('Bank Route', () => {
  test('should fetch banks', async () => {
    const response = await request(app).get('/banks');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Banks found');
    expect(response.body).toHaveProperty('data');
  });
});
