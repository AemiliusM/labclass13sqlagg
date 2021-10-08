import { Router } from 'express';
import  AnimalsClass  from '../models/animalsmodel.js';

export default Router()
  .post('/', async(req, res, next) => {
    try{
      const newAnim = await AnimalsClass.saveNewAnim(req.body);
      console.log('NEWANM', newAnim);
      res.send(newAnim);
    }catch(err){
      next(err);
    }
  })
  .get('/', async(req, res, next) => {
    try{
      const getAnimalSpec = await AnimalsClass.listAnimSpec();
      res.send(getAnimalSpec);
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
  .patch('/:id', async(req, res, next) => {
    try{
      const id = req.params.id;
      const body = req.body;
      const updateAnimal = await AnimalsClass.fixOneAnimal(id, body);
      res.send(updateAnimal);
    } catch(err){
      next(err);
    }
  }).delete('/:id', async(req, res, next) => {
    try{
      const id = req.params.id;
      const deleteAnimal = await AnimalsClass.deleteOneAnimal(id);
      res.send(deleteAnimal);
    }catch(err){
      next(err);
    }
  });
