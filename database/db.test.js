const {getProducts, getProductFeatures, getProductStyles, getRelatedProducts} = require('./db.js');

var randomProduct;

beforeEach(() => {
  randomProduct = Math.floor(Math.random() * 1000011) + 1;
})

describe('getProducts', () => {
  test('It should respond with an array of five products when the count is 5', async() => {
    const result = await getProducts(1, 5);
    expect (result).toBeArray();
    expect (result.length).toBe(5);
  })

  test('every product object should include id, name, slogan, description, category, default_price, created_at, updated_at properties', async() => {
    const result = await getProducts(1, 5);
    result.forEach(product => {
      expect (product).toContainKeys(['id', 'name', 'slogan', 'description', 'category', 'default_price', 'created_at', 'updated_at']);
    });
  })

  test('It should return the products which ids are 10, 11 and 12 when passing 4 as page number and 3 as count number', async() => {
    const result = await getProducts(4, 3)
    const ids = result.map(product => product.id);
    expect (ids).toIncludeSameMembers([10, 11, 12])
  })
})

describe('getProductFeatures', () => {
  test('It should return all product level information for a specified product id', async() => {
    const result = await getProductFeatures(randomProduct);
    expect (result).toBeObject();
    expect (result).toContainKeys(['id', 'name', 'slogan', 'description', 'category', 'default_price', 'created_at', 'updated_at', 'features']);
  })

  test('The value of the features property should be an array', async() => {
    const result = await getProductFeatures(randomProduct);
    expect (result.features).toBeArray();
  })
})

describe('getRelatedProducts', () => {
  test('It should return an array of product ids related to the product specified', async() => {
    const result = await getRelatedProducts(randomProduct);
    expect (result).toBeArray();
    result.forEach(id => {
      expect(id).toBeNumber();
    })
  })
})

describe('getProductStyles', () => {
  test('It should respond an object that includes product id and an array of all styles', async() => {
    const result = await getProductStyles(randomProduct);
    expect (result).toBeObject();
    expect (result).toContainKeys(['product_id', 'results']);
    expect (result.results).toBeArray();
  })

  test('every style object should include style_id, name, original_price, sale_price, default?, photos and skus property', async() => {
    const result = await getProductStyles(randomProduct);
    result.results.forEach(style => {
      expect (style).toContainKeys(['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus']);
    })
  })

  test('every style should have an array of photos or no photo', async() => {
    const result = await getProductStyles(randomProduct);
    result.results.forEach(style => {
      style.photos === null ?
        expect(style.photos).toBeNull() :
        expect(style.photos).toBeArray()
    })
  })

  test('every style should have an object of skus or no sku', async() => {
    const result = await getProductStyles(randomProduct);
    result.results.forEach(style => {
      style.skus === null ?
        expect(style.skus).toBeNull() :
        expect(style.skus).toBeObject()
    })
  })
})