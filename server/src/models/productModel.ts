import {Schema, model, Model} from 'mongoose';
import { ProductType } from '../types/Product';

interface ProductModel extends Model<ProductType>{}

const productSchema = new Schema<ProductType, ProductModel>({
  name: {type: String, required: true},
  slug: {type: String, required: true},
  image: {type: String, required: true},
  category: {type: String, required: true},
  brand: {type: String, required: true},
  price: {type: Number, required: true},
  countInStock: {type: Number, required: true},
  description: {type: String, required: true},
  rating: {type: Number, required: true},
  numReviews: {type: Number, required: true},
}, {timestamps: true});

const Product = model<ProductType, ProductModel>('Product', productSchema);

export {Product};