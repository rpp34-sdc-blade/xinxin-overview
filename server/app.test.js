const request = require('supertest');
const app = require('./app.js');

describe('GET /products', () => {
  test('It should respond with an array of products', async() => {
    const response = await request(app).get('/products');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeArray();
  })

  test('every product object should include id, name, slogan, description, category, default_price, created_at, updated_at properties', async() => {
    const response = await request(app).get('/products');
    response.body.forEach(element => {
      expect (element).toContainKeys(['id', 'name', 'slogan', 'description', 'category', 'default_price', 'created_at', 'updated_at']);
    });
  })
})

describe('GET /products/:product_id', () => {
  test('It should respond an product object if the requested product id is valid', async() => {
    const response = await request(app).get('/products/1');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeObject();
  })

  test('The specific product object should include basic informaton and features property', async() => {
    const response = await request(app).get('/products/1');
    expect (response.body).toContainKeys(['id', 'name', 'slogan', 'description', 'category', 'default_price', 'created_at', 'updated_at', 'features']);
  })

  test('The value of the features property should be an array', async() => {
    const response = await request(app).get('/products/1');
    expect (response.body.features).toBeArray();
  })
})

describe('GET /products/:product_id/related', () => {
  test('It should respond an array of product ids related to the product specified', async() => {
    const response = await request(app).get('/products/1/related');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeArray();
    response.body.forEach(id => {
      expect(id).toBeNumber();
    })
  })
})

describe('GET /products/:product_id/styles', () => {
  test('It should respond an object that includes product id and an array of all styles', async() => {
    const response = await request(app).get('/products/1/styles');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeObject();
    expect (response.body).toContainKeys(['product_id', 'results']);
    expect (response.body.results).toBeArray();
  })

  test('every style object should include style_id, name, original_price, sale_price, default?, photos and skus property', async() => {
    const response = await request(app).get('/products/1/styles');
    response.body.results.forEach(style => {
      expect (style).toContainKeys(['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus']);
    })
  })

  test('every style should have an array of photos or no photo', async() => {
    const response = await request(app).get('/products/1/styles');
    response.body.results.forEach(style => {
      style.photos === null ?
        expect(style.photos).toBeNull() :
        expect(style.photos).toBeArray()
    })
  })

  test('every style should have an array of photos or no photo', async() => {
    const response = await request(app).get('/products/1/styles');
    response.body.results.forEach(style => {
      style.photos === null ?
        expect(style.photos).toBeNull() :
        expect(style.photos).toBeArray()
    })
  })

  test('every style should have an object of skus or no sku', async() => {
    const response = await request(app).get('/products/1/styles');
    response.body.results.forEach(style => {
      style.skus === null ?
        expect(style.skus).toBeNull() :
        expect(style.skus).toBeObject()
    })
  })
})

