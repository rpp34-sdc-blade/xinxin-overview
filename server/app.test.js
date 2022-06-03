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
    response.body.forEach(product => {
      expect (product).toContainKeys(['id', 'name', 'slogan', 'description', 'category', 'default_price', 'created_at', 'updated_at']);
    });
  })

  test('The product ids from the response should be between 1 and 5 when requesting this API without page and count parameters', async() => {
    const response = await request(app).get('/products');
    const ids = response.body.map(element => element.id);
    expect (ids).toIncludeSameMembers([1, 2, 3, 4, 5])
  })

  test('The product ids from the response should include 10, 11 and 12 while setting page parameters as 4 and count as 3', async() => {
    const response = await request(app).get('/products?page=4&count=3');
    const ids = response.body.map(element => element.id);
    expect (ids).toIncludeSameMembers([10, 11, 12])
  })
})

describe('GET /products/:product_id', () => {
  test('It should respond an product object if the requested product id is valid', async() => {
    const response = await request(app).get('/products/1');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeObject();
  })

  test('It should respond an error message with 404 status code if the requested product id is invalid', async() => {
    const response = await request(app).get('/products/0');
    expect (response.statusCode).toBe(404);
    expect (response.text).toBe('This product does not exist.');
  })

  test('It should return all product level information for a specified product id.', async() => {
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
  test('It should return the all styles available for the given product', async() => {
    const response = await request(app).get('/products/1/styles');
    expect (response.statusCode).toBe(200);
    expect (response.body).toBeObject();
    expect (response.body).toContainKeys(['product_id', 'results']);
    expect (response.body.results).toBeArray();
  })

  test('The results should be an empty array when a product does not have any style', async() => {
    const response = await request(app).get('/products/71698/styles');
    expect (response.body.results.length).toBe(0);
  })

  test('every style object should include style_id, name, original_price, sale_price, default?, photos and skus property', async() => {
    const response = await request(app).get('/products/1/styles');
    if (response.body.results) {
      response.body.results.forEach(style => {
        expect (style).toContainKeys(['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus']);
      })
    }
  })

  test('every style should have an array of photos or no photo', async() => {
    const response = await request(app).get('/products/1/styles');
    response.body.results.forEach(style => {
      style.photos === null ?
        expect(style.photos).toBeNull() :
        expect(style.photos).toBeArray()
    })
  })

  test('every photo object should have thumbnail_url and url properties no matter a style has photos or not', async() => {
    const response = await request(app).get('/products/1/styles');
    const stylesArr = response.body.results
    stylesArr.forEach(style => {
      style.photos.forEach(photo => {
        expect(photo).toContainKeys(['thumbnail_url', 'url'])
      })
    })
  })

  test('In the skus object, each sku id should be the key, and an object including the size and the quantity is the value', async() => {
    const response = await request(app).get('/products/1/styles');
    const stylesArr = response.body.results
    stylesArr.forEach(style => {
      expect (style.skus).toBeObject();
      for (var key in style.skus) {
        expect(style.skus[key]).toBeObject();
        expect(style.skus[key]).toContainKeys(['size', 'quantity']);
      }
    })
  })
})

