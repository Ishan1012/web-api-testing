const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const testRoutes = require('./routes/TestRoutes');

dotenv.config(); // Load .env *before* accessing environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Define dbURI *after* dotenv.config()
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testbuddy';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/testcases', testRoutes);

// Connect to MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    // Start the server *after* DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
