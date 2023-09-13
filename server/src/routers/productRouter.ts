import express from 'express';
import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel';

export const productRouter = express.Router();

// get All products
productRouter.get('/', asyncHandler(async (req, res )=>{
  const products = await Product.find();
  res.json(products);
}))

// get a product
productRouter.get('/slug/:slug', asyncHandler( async(req, res) => {
  const product = await Product.findOne({ slug: req.params.slug});
  if(!product){
    res.status(404).json({message : 'Product Not Found'});
  }else{ 
    res.json(product);
  }
}))
