import { Router } from 'express';
import  SpeciesClass  from '../models/speciesmodel.js';

export default Router()
  .post('/', async(req, res, next) => {
    try{
      const newSpec = await SpeciesClass.saveNewSpec(req.body);
      console.log('NEWSPEC', newSpec);
      res.send(newSpec);
    }catch(err){
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try{
      const getSpecies = await SpeciesClass.listSpec();
      res.send(getSpecies);
    }catch(err){
      next(err);
    }
  });
