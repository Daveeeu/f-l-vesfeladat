// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/productRegistry', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
