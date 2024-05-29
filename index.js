require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./src/config/db');
const routes = require('./src/routes/routes');

const app = express();

// Use CORS middleware
const corsOptions = {
  origin: '*', // You can specify a specific origin here or use an array of allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Set to true if you need to pass cookies with the request
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
