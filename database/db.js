const {Pool} = require('pg');
const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'atelier',
  port: 5433
})

pool.connect()
.then(() => console.log('connected to postgresql'))
.catch((err) => console.log(err))

var getProducts = (page, count) => {
  var query = 'SELECT * FROM product OFFSET $1 LIMIT $2';
  var values = [(page - 1) * count, count];
  return pool.query(query, values)
  .then(({rows}) => rows)
  .catch(err => {throw err})
}

var getAProduct = (id) => {
  console.log('id in db', id);
  var query = 'SELECT * FROM product Where id = $1';
  var values = [id];
  return pool.query(query, values)
  .then(({rows}) => {
    console.log('get a product from db', rows);
    return rows;
  })
  .catch(err => {throw err})
}

var getProductFeatures = (id) => {
  var query = 'SELECT f.feature, f.value FROM product_feature pf INNER JOIN feature f on pf.feature_id = f.id WHERE pf.product_id = $1';
  var values = [id];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows;
  })
  .catch(err => {throw err})
}

var getProductStyles = (id) => {
  var query = 'SELECT id as style_id, name, original_price, sale_price, "default?" FROM style WHERE product_id = $1';
  var values = [id];
  var values = [id];
  return pool.query(query, values)
  .then(({rows}) => {
    console.log('rows for styles', rows);
    return rows;
  })
  .catch(err => {throw err})
}

var getStylePhotos = (styleId) => {
  var query = 'SELECT thumbnail_url, url FROM photo WHERE style_id = $1';
  var values = [styleId];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows;
  })
  .catch(err => {throw err})
}

var getStyleSkus = (styleId) => {
  var query = 'SELECT id, quantity, size FROM sku WHERE style_id = $1';
  var values = [styleId];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows;
  })
  .catch(err => {throw err})
}

var getRelatedProducts = (id) => {
  var query = 'SELECT relatedproduct_id FROM relatedproduct WHERE product_id = $1';
  var values = [id];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows;
  })
  .catch(err => {throw err})
}


module.exports = {
  getProducts,
  getAProduct,
  getProductFeatures,
  getProductStyles,
  getStylePhotos,
  getStyleSkus,
  getRelatedProducts
}

