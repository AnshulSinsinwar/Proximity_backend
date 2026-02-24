import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';
import { config } from './config/config';

const app = express();

// Middlewares
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());


// ADD THIS HEALTH CHECK ROUTE HERE
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is active' });
});


// Serve Static Files
app.use(express.static(require('path').join(__dirname, '../public')));

// Mount Routes
app.use('/api/v1', apiRoutes);

export default app;
