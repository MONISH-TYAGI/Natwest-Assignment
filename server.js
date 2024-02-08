// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/files', require('./src/routes/fileUpload'));
app.use('/api/students', require('./src/routes/students'));

// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
