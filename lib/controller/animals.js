import { Router } from 'express';
import  AnimalsClass  from '../models/animalsmodel.js';

export default Router()
  .post('/', async(req, res, next) => {
    try{
      const newAnim = await AnimalsClass.saveNewAnim(req.body);
      res.send(newAnim);
    }catch(err){
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try{
      const id = req.params.id;
      const getAnimals = await AnimalsClass.listAnim(id);
      res.send(getAnimals);
    }catch(err){
      next(err);
    }
  })
  .get('/all', async(req, res, next) => {
    try{
      const getAnimalSpec = await AnimalsClass.listAnimSpec();
      res.send(getAnimalSpec);
    }catch(err){
      next(err);
    }
  });
