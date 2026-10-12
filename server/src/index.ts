import express from 'express';

const app = express();
const PORT = 3000;

// Health check: lets us quickly verify that the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello from Travel Planner!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});