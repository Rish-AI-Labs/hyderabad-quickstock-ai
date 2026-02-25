import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import salesRoutes from './routes/sales.js';
import forecastRoutes from './routes/forecast.js';
import IntelligenceRoutes from './routes/Intelligence.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/forecast', forecastRoutes);
app.use('/api/v1/Intelligence', IntelligenceRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'QuickStock AI Server is running' });
});

// Serve static files from the dist directory (for production/Docker)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Serving static files from: ${distPath}`);
});
