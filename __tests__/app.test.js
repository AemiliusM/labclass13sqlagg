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
      .send({ speciesName: 'flooper', extinct: true })
      .then(res => {
        expect(res.body).toEqual({ id: '1', speciesName: 'flooper', extinct: true });

      });
  });

  it('gets all species', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true }); 
    await request(app).post('/api/species')
      .send({ speciesName: 'blooper', extinct: true }); 
    return await request(app).get('/api/species').then(res => {
      expect(res.body).toEqual([{ id: '1', speciesName: 'flooper', extinct: true }, { id: '2', speciesName: 'blooper', extinct: true }]);
    });
  });

  it('adds an animal', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true });
    return await request(app).post('/api/animals').send({ name: 'bickle', colour: 'forest purple', speciesId: 1 }).then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', speciesId: '1' });
    });
  });

  it('gets an animal by id', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true }); 
    await request(app).post('/api/animals').send({ name: 'bickle', colour: 'forest purple', speciesId: '1' });
    return await request(app).get('/api/animals/1').then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', speciesId: '1' });
    });

  });  
  it('gets all animals and their species', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true });

    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', speciesId: 1 });

    return request(app).get('/api/animals').then(res => {
      expect(res.body).toEqual([{ name: 'bickle', speciesName: 'flooper' }]);
    });
  });

  it('updates an animal name', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true }); 
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', speciesId: '1' });
    return await request(app).patch('/api/animals/1').send({ name: 'narkle', colour: 'forest purple', speciesId: '1' }).then(res => {
      expect(res.body).toEqual({ id: '1', name: 'narkle', colour: 'forest purple', speciesId: '1' });
    });

  });
  it('should delete an animal', async() => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true });
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', speciesId: '1' });
    return await request(app).delete('/api/animals/1').then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', speciesId: '1' });
    });
  });

  it('should get the count of all animals', async () => {
    await request(app).post('/api/species')
      .send({ speciesName: 'flooper', extinct: true });
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', speciesId: '1' });
    return request(app).get('/api/animals/count').then(res => {
      expect(res.body).toEqual('1');
    });
  });

  afterAll(() => {
    pool.end();
  });
});
