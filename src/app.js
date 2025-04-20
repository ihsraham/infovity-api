const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const registerRoutes = require('./routes/register');

// Create Express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure CORS
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server default
    'http://localhost:3000',
    'https://webinar-website.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Register routes
app.use('/api/register', registerRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export for Vercel
module.exports = app;

// If running directly (not through Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}