require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const userRoutes = require ("./routes/userRoutes.js");
const propertyRoutes = require ("./routes/propertyRoutes.js");

const app = express();
const PORT = process.env.PORT || 8000;

// const uri = 'mongodb://127.0.0.1:27017/system-test';
const uri = 'mongodb+srv://sapiens_admin:P*tynC4mHMk*U3e@cluster0.ay44bws.mongodb.net/sapiens';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(function (req, res, next) {
    express.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Pass to next layer of middleware
    next();
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertyRoutes);

app.all("*",(req , res ) => res.send("That route doesn't exist"))

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});