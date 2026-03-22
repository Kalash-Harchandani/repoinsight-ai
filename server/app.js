import express from 'express';
import cors from 'cors';
import repoRoutes from './routes/repoRoutes.js';

const app = express();

// Middleware
const allowedOrigins = [
  'https://repoinsight-ai.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api', repoRoutes);

// Simple health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
