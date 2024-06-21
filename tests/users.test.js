const request = require('supertest');
const app = require('../src/server');
const db = require('../src/database/connection');

describe('Users API', () => {
  beforeAll(async () => {
    await db.query('TRUNCATE TABLE users');
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not create a user with invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'testpassword',
        email: 'invalid-email'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual('Email is not valid');
  });
});
