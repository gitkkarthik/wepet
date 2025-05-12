const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (without deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Log current directory
// console.log('Current directory:', __dirname);

// Import routes with explicit file extension
const vetRoutes = require('./routes/vets.js');
const bookingRoutes = require('./routes/booking.js');

// Use routes
app.use('/vets', vetRoutes);
// console.log('After mounting /vets, current directory:', __dirname);

app.use('/book', bookingRoutes);
// console.log('After mounting /book, current directory:', __dirname);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
