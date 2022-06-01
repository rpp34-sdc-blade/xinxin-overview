const express = require('express');
const app = express();
const {getProducts, getProductFeatures, getProductStyles, getRelatedProducts} = require('../database/db.js');

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  getProducts(page, count)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

app.get('/products/:product_id', (req, res) => {
  var product_id = req.params.product_id;
  getProductFeatures(product_id)
  .then(data => {
    res.send(data);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  var product_id = req.params.product_id;
  getProductStyles(product_id)
  .then(data => {
    res.send(data);
  })
})

app.get('/products/:product_id/related', (req, res) => {
  var product_id = req.params.product_id;
  getRelatedProducts(product_id)
  .then(data => {
    res.send(data);
  })
  .catch(err => console.log(err))
})

module.exports = app;
