import { Router } from 'express';
import  SpeciesClass  from '../models/speciesmodel.js';

export default Router()
  .post('/', async(req, res, next) => {
    try{
      const newSpec = await SpeciesClass.saveNewSpec(req.body);
      res.send(newSpec);
    }catch(err){
      next(err);
    }
  });
