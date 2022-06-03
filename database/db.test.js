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


  test('The value of the features property should be an array ', async() => {
    const result = await getProductFeatures(randomProduct);
    expect (result.features).toBeArray();
  })

  test('The features should include one or multiple objects which have feature and value properties if a product has features', async() => {
    const result = await getProductFeatures(1);
    expect (result.features).toBeArray();
    result.features.forEach(featureObj => {
      expect (featureObj).toContainKeys(['feature', 'value']);
    })
  })

  test('The features should be an empty array if a product does not have any feature', async() => {
    const result = await getProductFeatures(10);
    expect (result.features).toBeArray();
    expect (result.features.length).toBe(0);
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

  test('The results should be an empty array when a product does not have any style', async() => {
    const result = await getProductStyles(71698);
    expect (result.results.length).toBe(0);
  })

  test('every style object should include style_id, name, original_price, sale_price, default?, photos and skus property', async() => {
    const result = await getProductStyles(randomProduct);
    if (result.results.length) {
      result.results.forEach(style => {
        expect (style).toContainKeys(['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus']);
      })
    }
  })

  test('every photo object should have thumbnail_url and url properties no matter a style has photos or not', async() => {
    const result = await getProductStyles(randomProduct);
    const stylesArr = result.results
    stylesArr.forEach(style => {
      style.photos.forEach(photo => {
        expect(photo).toContainKeys(['thumbnail_url', 'url'])
      })
    })
  })

  test('The thumbnail_url and url properties should be null in the photo object if a style does not have a photo', async() => {
    const result = await getProductStyles(2);
    const stylesArr = result.results
    stylesArr.forEach(style => {
      expect(style.photos.length).toBe(1);
      expect(style.photos[0].thumbnail_url).toBeNull();
      expect(style.photos[0].url).toBeNull();
    })
  })

  test('In the skus object, each sku id should be the key, and an object including the size and the quantity is the value', async() => {
    const result = await getProductStyles(randomProduct);
    const stylesArr = result.results
    stylesArr.forEach(style => {
      expect (style.skus).toBeObject();
      for (var key in style.skus) {
        expect(style.skus[key]).toBeObject();
        expect(style.skus[key]).toContainKeys(['size', 'quantity']);
      }
    })
  })

  test('the sku id, the size and the quantity should be null if a style does not have a sku info', async() => {
    const result = await getProductStyles(2);
    const stylesArr = result.results
    stylesArr.forEach(style => {
      expect (style.skus).toBeObject();
      expect(style.skus.null.size).toBeNull();
      expect(style.skus.null.quantity).toBeNull();
    })
  })
})