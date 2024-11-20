import express from 'express';
import applicationRoutes from './routes/applicationRoutes';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Application routes (includes authentication and authorization)
app.use('/api/v1/application', applicationRoutes);

export default app;
