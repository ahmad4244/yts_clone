import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRoutes from './routes/moviesRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', moviesRoutes); 

export default app;
