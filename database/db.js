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
  var query = 'SELECT * FROM product WHERE id BETWEEN $1 AND $2';
  var values = [(page - 1) * count + 1, page * count];
  return pool.query(query, values)
  .then(({rows}) => rows)
  .catch(err => {throw err})
}


var getProductFeatures = (productId) => {
  var query = `
  SELECT p.*,
  (
    SELECT coalesce(json_agg(json_build_object('feature', f.feature, 'value', CASE WHEN f.value = 'null' THEN null ELSE f.value END)), '[]'::json)
    FROM product_feature pf, feature f
    WHERE p.id = pf.product_id and pf.feature_id = f.id
   ) as features

  FROM product p
  WHERE id = $1;
  `;
  var values = [productId];
  return pool.query(query, values)
  .then(({rows}) => {
    return rows[0];
  })
  .catch(err => {
    throw new Error(err)
  })
}

var getProductStyles = (productId) => {
    var query = `
    SELECT id AS product_id,
    (
      SELECT  coalesce(array_to_json(array_agg(t)), '[]'::json)
      FROM (
        SELECT id AS style_id, name, original_price, CASE WHEN sale_price = 'null' THEN null ELSE sale_price END, "default?",
        (
          SELECT coalesce(array_to_json(array_agg(d)),'[{"thumbnail_url": null, "url": null}]'::json)
          FROM (
            SELECT thumbnail_url, url
            FROM photo
            WHERE style_id = style.id
          ) d
        ) AS photos,
        (
          SELECT coalesce(jsonb_object_agg(id, to_jsonb(sku) - 'style_id' - 'id'), '{"null": {"quantity": null, "size": null}}'::jsonb) skus
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
  .catch(err => {
    console.log('styles db err', err);
    throw err
  })
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