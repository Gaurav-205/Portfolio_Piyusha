import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Express API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${config.nodeEnv}`);
});

export default app;
