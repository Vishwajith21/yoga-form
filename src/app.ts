import express from 'express'
import { PrismaClient } from '@prisma/client';
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from './routes/user'
import batchRoutes from './routes/batch'
import paymentRoutes from './routes/payment'
const app = express();

const PORT = 3300;
export const prisma = new PrismaClient();

app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/user',userRoutes);
app.use('/batch',batchRoutes);
app.use('/payment',paymentRoutes);

app.listen(PORT, ()=> {
    console.log(`Yoga server is running on port ${PORT}`);
})
export default prisma;