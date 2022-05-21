const express = require('express');
const app = express();
const port = 5000;
const {getProducts, getAProduct, getProductFeatures, getProductStyles, getStylePhotos, getStyleSkus, getRelatedProducts} = require('../database/db.js');

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  getProducts(page, count)
  .then(data => res.send(data))
  .catch(err => console.log(err))
})

app.get('/products/:product_id', (req, res) => {
  var product_id = req.params.product_id;
  var productInfo = {};
  getAProduct(product_id)
  .then(data => {
    if(!data.length) {
      res.send('This product does not exist.')
    } else {
      productInfo = data[0];
      return getProductFeatures(product_id)
    }
  })
  .then(productFeatures => {
    productInfo.features = productFeatures;
    res.send(productInfo);
  })
  .catch(err => console.log(err))
})

app.get('/products/:product_id/styles', (req, res) => {
  var product_id = req.params.product_id;
  var results = [];
  getProductStyles(product_id)
  .then(styles => {
    results = styles;
    var photoPromises = styles.map(style => getStylePhotos(style.style_id));
    return Promise.all(photoPromises);
  })
  .then(photos => {
    results.forEach((style, index) => style.photos = photos[index]);
    var skuPromises = results.map(style => getStyleSkus(style.style_id));
    return Promise.all(skuPromises);
  })
  .then(skus => {
    console.log('skus', skus);
    skus = skus.map(styleSkus => {
      return styleSkus.reduce((obj, sku) => {
        console.log('obj', obj, sku);
        obj[sku.id] = {
          quantity: sku.quantity,
          size: sku.size
        }
        return obj;
      }, {})
    })
    results.forEach((style, index) => style.skus = skus[index]);
    var stylesData = {
      product_id,
      results,
    }
    res.send(stylesData);
  })
  .catch(err => console.log(err))
})

app.get('/products/:product_id/related', (req, res) => {
  var product_id = req.params.product_id;
  getRelatedProducts(product_id)
  .then(data => {
    var related = data.map(obj => obj.relatedproduct_id);
    res.send(related);
  })
  .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})