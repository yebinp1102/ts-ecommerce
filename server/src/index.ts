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

app.get('/api/products', (req: Request, res: Response) => {
  return res.json(sampleProducts);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});