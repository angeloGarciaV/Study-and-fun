const request = require('supertest');
const app = require('../src/server');
const db = require('../src/database/connection');

describe('Scores API', () => {
  beforeAll(async () => {
    await db.query('TRUNCATE TABLE scores');
  });

  it('should create or update a score', async () => {
    const res = await request(app)
      .post('/api/scores')
      .send({
        user_id: 1,
        score: 100
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user_id', 1);
    expect(res.body).toHaveProperty('score', 100);
  });

  it('should get score for a user', async () => {
    const res = await request(app)
      .get('/api/scores/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id', 1);
    expect(res.body).toHaveProperty('score', 100);
  });
});
