import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import salesRoutes from '../frontend/server/routes/sales.js';
import forecastRoutes from '../frontend/server/routes/forecast.js';
import IntelligenceRoutes from '../frontend/server/routes/Intelligence.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/forecast', forecastRoutes);
app.use('/api/v1/Intelligence', IntelligenceRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'QuickStock AI API is running' });
});

export default app;
