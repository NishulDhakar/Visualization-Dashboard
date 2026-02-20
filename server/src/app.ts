import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import dataRoutes from './routes/dataRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import { errorHandler, notFound } from './utils/errorHandler';

const app: Application = express();

app.use(compression());
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - start;
        process.stdout.write(`${req.method} ${req.originalUrl} → ${ms}ms [${res.statusCode}]\n`);
    });
    next();
});

app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/data', dataRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
