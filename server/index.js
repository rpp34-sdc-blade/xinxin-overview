const express = require('express');
const app = express();
const port = 5000;
const {getProducts, getAProduct, getProductFeatures} = require('../database/db.js');

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  getProducts(page, count)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

app.get('/products/:product_id', (req, res) => {
  var product_id = req.params.product_id;
  getAProduct(product_id)
  .then(productInfo => {
    if(!productInfo.length) {
      res.send('This product does not exist.')
    } else {
      return productInfo[0];
    }
  })
  .then(productInfo => {
    getProductFeatures(product_id)
    .then(productFeatures => {
      productInfo.features = productFeatures;
      res.send(productInfo);
    })
  })
  .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})