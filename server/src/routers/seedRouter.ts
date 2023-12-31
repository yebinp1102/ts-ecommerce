import express from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';
import { sampleProducts, sampleUsers } from '../data';
import {User}  from '../models/userModel';

export const seedRouter = express.Router();

seedRouter.get('/', asyncHandler( async(req, res ) =>{
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(sampleProducts);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(sampleUsers)
  res.json({createdProducts, createdUsers});
})) 