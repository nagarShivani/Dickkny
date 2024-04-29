
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

require('./src/config/db'); 
const routes = require('./src/routes/routes'); 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});