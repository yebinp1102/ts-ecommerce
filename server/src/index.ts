import express, {Request, Response} from 'express';
import { sampleProducts } from './data';
import cors from 'cors'

const app = express();
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// get products list
app.get('/api/products', (req: Request, res: Response) => {
  return res.json(sampleProducts);
});

// get a product information
app.get('/api/products/:slug', (req:Request, res :Response) => {
  res.json(sampleProducts.find(x => x.slug === req.params.slug));
})

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});