import express, { Application } from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import { errorHandler, notFound } from './utils/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/data', dataRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
