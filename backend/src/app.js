import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import homeRoutes from './routes/home.routes.js';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' , credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limit
const globalLimiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(globalLimiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/homes', homeRoutes);

// Error handler
app.use(errorHandler);

export default app;
