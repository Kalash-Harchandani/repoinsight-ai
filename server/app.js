import express from 'express';
import cors from 'cors';
import repoRoutes from './routes/repoRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', repoRoutes);

// Simple health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
