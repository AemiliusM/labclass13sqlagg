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

  it('gets all species', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    return await request(app).get('/api/species').then(res => {
      expect(res.body).toEqual({ id: '1', species_name: 'flooper', extinct: true }, { id:'2', species_name: 'dringet', extinct: true }, { id:'3', species_name: 'smaxs', extinct: true });
    });
  });

  it('adds an animal', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    return await request(app).post('/api/animals').send({ name: 'bickle', colour: 'forest purple', species_id: '1' }).then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', species_id: '1' });
    });
  });

  it('gets an animal by id', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    await request(app).post('/api/animals').send({ name: 'bickle', colour: 'forest purple', species_id: '1' });
    return await request(app).get('/api/animals/1').then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', species_id: '1' });
    });

  });  
  xit('gets all animals and their species', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', species_id: '1' });
    return await request(app).get('/api/animals/all').then(res => {
      expect(res.body).toEqual({ name: 'bickle', species_name: 'flooper' });
    });
  });

  it('updates an animal name', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', species_id: '1' });
    return await request(app).patch('/api/animals/1').send({ name: 'narkle', colour: 'forest purple', species_id: '1' }).then(res => {
      expect(res.body).toEqual({ id: '1', name: 'narkle', colour: 'forest purple', species_id: '1' });
    });

  });
  it('should delete an animal', async() => {
    await request(app).post('/api/species')
      .send({ species_name: 'flooper', extinct: true }, 
        { species_name: 'dringet', extinct: true }, 
        { species_name: 'smaxs', extinct: true });
    await request(app).post('/api/animals')
      .send({ name: 'bickle', colour: 'forest purple', species_id: '1' });
    return await request(app).delete('/api/species/1').then(res => {
      expect(res.body).toEqual({ id: '1', name: 'bickle', colour: 'forest purple', species_id: '1' });
    });
  });
  afterAll(() => {
    pool.end();
  });
});
