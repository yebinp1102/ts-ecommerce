import express from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';
import { sampleProducts } from '../data';

export const seedRouter = express.Router();

seedRouter.get('/', asyncHandler( async(req, res ) =>{
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(sampleProducts);
  res.json({createdProducts});
}))