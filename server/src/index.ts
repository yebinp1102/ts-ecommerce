import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { productRouter } from './routers/productRouter';
import { seedRouter } from './routers/seedRouter';

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('MongoDB is connected.');
  })
  .catch(() => {
    console.log('Fail to connect MongoDB.');
  })

const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});