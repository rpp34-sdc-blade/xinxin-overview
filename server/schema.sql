CREATE TABLE product (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE style (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  original_price VARCHAR(10) NOT NULL,
  sale_price VARCHAR(10) DEFAULT NULL,
  "default?" BOOLEAN NOT NULL,
  product_id SERIAL REFERENCES product(id)
);

CREATE TABLE photo (
  id SERIAL NOT NULL PRIMARY KEY,
  thumbnail_url VARCHAR,
  url VARCHAR,
  style_id SERIAL REFERENCES style(id)
);

CREATE TABLE sku (
  id SERIAL NOT NULL PRIMARY KEY,
  quantity INT,
  size VARCHAR(10),
  style_id SERIAL REFERENCES style(id)
);

CREATE TABLE relatedproduct (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  relatedProduct_id INT REFERENCES product(id)
);

CREATE TABLE feature (
  id SERIAL NOT NULL PRIMARY KEY,
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50) DEFAULT NULL,
  UNIQUE(feature, value)
);

CREATE TABLE product_feature (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id SERIAL REFERENCES product(id),
  feature_id SERIAL REFERENCES feature(id)
);


COPY product (id, name, slogan, description, category, default_price) from '/Users/xinxinli/Downloads/product.csv' CSV HEADER;

-- styles has 1,958,103 rows
COPY style (id, product_id, name, sale_price, original_price, "default?") from '/Users/xinxinli/Downloads/styles.csv' CSV HEADER;
-- COPY 1958102

COPY photo (id, style_id, url, thumbnail_url) from '/Users/xinxinli/Downloads/photos.csv' CSV HEADER;
-- COPY 5655463

COPY sku (id, style_id, size, quantity) from '/Users/xinxinli/Downloads/skus.csv' CSV HEADER;
-- COPY 11323917

-- realted has 4508263 rows
COPY relatedproduct (id, product_id, relatedProduct_id) from '/Users/xinxinli/hackreactor/xinxin-overview/data/cleanRelated.csv' CSV HEADER;
-- COPY 4508205

COPY feature (feature, value) from '/Users/xinxinli/hackreactor/xinxin-overview/data/uniqueFeatures.csv' CSV HEADER;
--COPY 46

COPY product_feature (id, product_id, feature_id) from '/Users/xinxinli/hackreactor/xinxin-overview/data/productFeature.csv' CSV HEADER;
-- COPY 2219279