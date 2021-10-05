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
  .get('/', async(req, res, next) => {
    try{
      const getAnimals = await AnimalsClass.listAnim();
      res.send(getAnimals);
    }catch(err){
      next(err);
    }
  });
