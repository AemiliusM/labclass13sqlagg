import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('posts a new species to the species table', async() => {
    return await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true })
      .then(res => {
        expect(res.body).toEqual({ id: '1', species_name: 'flooper', extinct: true });

      });
  });

  afterAll(() => {
    pool.end();
  });
});
