const express = require('express');
const app = express();
const port = 5000;
const {getProducts} = require('../database/db.js');



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})