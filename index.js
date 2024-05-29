require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  require('./src/config/db'); 
  const routes = require('./src/routes/routes'); 

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
