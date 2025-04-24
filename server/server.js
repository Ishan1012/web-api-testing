const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const testRoutes = require('./routes/TestRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Database connection URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testcasesdb';

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// API routes for test cases
app.use('/api/testcases', testRoutes); // Corrected route path: added leading slash

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, 'client', 'build'))); // Corrected path to build directory

// Handle all other requests by serving the client's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // Corrected path to index.html
});

// Connect to MongoDB
if (!dbURI) {
  console.error('MongoDB URI not provided in environment variables');
  process.exit(1);
}

mongoose.connect(dbURI, { // Using the defined dbURI constant
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});