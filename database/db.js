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


var getProductFeatures = (productId) => {
  var query = `
    SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, p.created_at, p.updated_at,
    json_agg(json_build_object('feature', f.feature, 'value', f.value)) AS features
    FROM product p
    INNER JOIN product_feature pf on p.id = pf.product_id
    INNER JOIN feature f on pf.feature_id = f.id
    WHERE p.id = $1
    GROUP BY p.id
  `;
  var values = [productId];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows[0];
  })
  .catch(err => {throw err})
}

var getProductStyles = (productId) => {
    var query = `
    SELECT id AS product_id,
    (
      SELECT array_to_json(array_agg(t))
      FROM (
        SELECT id AS style_id, name, original_price, sale_price, "default?",
        (
          SELECT array_to_json(array_agg(d))
          FROM (
            SELECT thumbnail_url, url
            FROM photo
            WHERE style_id = style.id
          ) d
        ) AS photos,
        (
          SELECT jsonb_object_agg(id, to_jsonb(sku) - 'style_id' - 'id') skus
          FROM sku
          WHERE style_id = style.id
        )
        FROM style
        WHERE product_id = product.id
      ) t
    ) AS results
    FROM product
    WHERE id = $1;
  `;
  var values = [productId];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows[0];
  })
  .catch(err => {throw err})
}


var getRelatedProducts = (id) => {
  var query = 'SELECT array_agg(relatedproduct_id) FROM relatedproduct WHERE product_id = $1';
  var values = [id];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows[0].array_agg;
  })
  .catch(err => {throw err})
}

module.exports = {
  getProducts,
  getProductFeatures,
  getProductStyles,
  getRelatedProducts
}