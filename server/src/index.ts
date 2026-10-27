import express from 'express';
import { connectToDatabase } from './db';
import { tripsRouter } from './routes/trips';

// Load variables from .env into process.env
process.loadEnvFile();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Health check: lets us quickly verify that the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Travel Planner!' });
});

app.use('/api/trips', tripsRouter);


// Connect to the database first, then start the server
async function start() {
  await connectToDatabase();
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});