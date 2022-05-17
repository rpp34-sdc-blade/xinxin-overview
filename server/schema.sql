CREATE TABLE product (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slogan VARCHAR(100) NOT NULL,
  description VARCHAR NOT NULL,
  category VARCHAR(30) NOT NULL,
  default_price VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE style (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  original_price VARCHAR(10) NOT NULL,
  sale_price VARCHAR(10) DEFAULT NULL,
  'default?' BOOLEAN NOT NULL,
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
  size: VARCHAR(10),
  style_id SERIAL REFERENCES style(id)
);

CREATE TABLE relatedProduct (
  id SERIAL NOT NULL PRIMARY KEY,
  relatedProducts integer[],
  product_id SERIAL REFERENCES product(id)
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