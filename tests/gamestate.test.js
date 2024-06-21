const request = require('supertest');
const app = require('../src/server');
const db = require('../src/database/connection');

describe('GameState API', () => {
  beforeAll(async () => {
    await db.query('TRUNCATE TABLE game_state');
  });

  it('should create a new game state', async () => {
    const res = await request(app)
      .post('/api/gamestate')
      .send({
        user_id: 1,
        stage: 1,
        state: 'Iniciado'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get game state for a user and stage', async () => {
    const res = await request(app)
      .get('/api/gamestate/1/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user_id', 1);
    expect(res.body).toHaveProperty('stage', 1);
  });
});
