const express = require('express');
const app = express();
const {getProducts, getProductFeatures, getProductStyles, getRelatedProducts} = require('../database/db.js');
require('newrelic');

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  getProducts(page, count)
  .then(data => res.send(data))
  .catch(err => res.status(500).send(`Error getting information on products from page ${page} and count ${count}`))
})

app.get('/products/:product_id', (req, res) => {
  var product_id = req.params.product_id;
  getProductFeatures(product_id)
  .then(data => {
    data === undefined ?
      res.status(404).send('This product does not exist.') :
      res.send(data);
  })
  .catch((error) => {
    res.status(500).send(`Error getting info on product ${product_id}`);
  })
})

app.get('/products/:product_id/styles', (req, res) => {
  var product_id = req.params.product_id;
  getProductStyles(product_id)
  .then(data => {
    res.send(data);
  })
  .catch((error) => {
    res.status(500).send(`Error getting styles on product ${product_id}`);
  })
})

app.get('/products/:product_id/related', (req, res) => {
  var product_id = req.params.product_id;
  getRelatedProducts(product_id)
  .then(data => {
    res.send(data);
  })
  .catch((error) => {
    res.status(500).send('Error getting related products');
  });
})

module.exports = app;
