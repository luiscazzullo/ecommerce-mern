import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';

dotenv.config();
connectDB();

const app = express();

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.use(express.json());
app.use(cors());

app.use('/api/orders', orderRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use(errorHandler);
app.use(notFound);



const PORT = process.env.PORT || 5800;

app.listen(PORT, console.log(`La aplicación está corriendo en el puerto ${PORT}`));