// backend/index.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // To load environment variables from .env file

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://123:123@users.yq9arbk.mongodb.net/mydatabase?retryWrites=true&w=majority';  // Use environment variable or default
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// MongoDB connection
mongoose.connect(mongoURI, mongoOptions)
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware setup
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// Root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// User registration route (POST /api/register)
const User = require('./models/User');

// Register User Route (for testing)
app.post('/api/register', async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    const newUser = new User({ email, phoneNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login Route (POST /api/login)
app.post('/api/login', async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  // Validate request
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Please provide either email or phone number to log in.' });
  }

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // You would typically add password comparison here
    // For now, we'll skip password validation for simplicity
    // Example: if (user.password !== password) { return res.status(401).json({ error: 'Invalid password.' }); }

    res.status(200).json({ message: 'Login successful!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in.' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
