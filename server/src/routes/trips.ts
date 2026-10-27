import { Router } from 'express';
import { Trip } from '../models/trip';

export const tripsRouter = Router();

tripsRouter.get('/', async (req, res) => {
  const trips = await Trip.find().sort({ startDate: -1 });
  res.json(trips);
});