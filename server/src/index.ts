import express from 'express';
import mongoose from 'mongoose';

// Load variables from .env into process.env
process.loadEnvFile();

const app = express();
const PORT = 3000;

// Health check: lets us quickly verify that the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Travel Planner!' });
});

// Connect to the database first, then start the server
async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in .env');
  }

  await mongoose.connect(mongoUri, { dbName: 'travel-planner' });
  console.log('Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});