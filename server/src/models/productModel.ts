import { Schema, model} from 'mongoose';


export interface ProductType {
  _id?: string
  name: string,
  slug: string,
  image: string,
  category: string,
  brand: string,
  price: number,
  countInStock: number,
  description: string,
  rating: number,
  numReviews: number
};


const productSchema = new Schema<ProductType>({
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

export const Product = model<ProductType>('Product', productSchema);


