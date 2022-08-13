# Products API services
I worked with another software engineer to rebuild back-end API service from a monolithic to service-oriented microservices to support our existing e-commerce application in this project. The service I built was scaled to meet the demands of production traffic which is 2000rps with < 1s response time with 0% error rate. 

## Technologies used

Backend Development:  Node.js, Express, Postgres, NGINX
</br>
Deployment: Docker, AWS EC2
</br>
Testing: Jest, SuperTest, K6, Loader.io, New Relic

---
## Table of Contents
  - <a href='#system-design'>System Design</a>
  - <a href='#usage'>Usage</a>
  - <a href='#installation'>Installation</a>
  - <a href='#other-services'>Other Services</a>

---
## System Design
  ### Database Design
  ![overview_schema_design](https://user-images.githubusercontent.com/84343573/184508947-0bb799ae-23d3-442d-b995-43e10afa8983.jpg)
  ### Architecture
  ![Architecture](https://user-images.githubusercontent.com/84343573/184517126-bd7eb432-7719-462c-a325-9b558d8b4039.png)

  
  ### Stress Test Results via Loader.io
  <img width="1154" alt="load tests1" src="https://user-images.githubusercontent.com/84343573/184509104-a81c9bb4-a55f-4d9a-912d-5dd102085abc.png">
  <img width="1131" alt="load 3" src="https://user-images.githubusercontent.com/84343573/184509116-13f0e4d5-0f9b-4050-840b-7faa15ccddda.png">
  <img width="1153" alt="loader 2" src="https://user-images.githubusercontent.com/84343573/184509123-e7e5bdbf-e0c6-41a7-92f4-bbfae7bbe207.png"

---
## Usage
  ### List all products
  Returns a list of all products of the retail website.

  `GET /products/`

  Response: `Status: 200 OK`
  ```json
  [
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
    },
    ...
]
  ```
  ### Get a product's details
  Return details of a single product

  `GET /products/:product_id`

  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the product for which data should be returned |

  Response: `Status: 200 OK`
  ```json
  {
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
  	{
            "feature": "Sole",
            "value": "Rubber"
        },
  	{
            "feature": "Material",
            "value": "FullControlSkin"
        },
  	// ...
    ],
  }
  ```
  ### Get a single product's styles
  Return all styles of single product

  `GET /products/:product_id/styles`

  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the product for which data should be returned |

  Response: `Status: 200 OK`
  ```json
  {
    "product_id": "1",
    "results": [
  	{
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
            {
              "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
              "url": "urlplaceholder/style_1_photo_number.jpg"
            },
            {
              "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
              "url": "urlplaceholder/style_1_photo_number.jpg"
           }
  			  // ...
        ],
      "skus": {
                "37": {
                      "quantity": 8,
                      "size": "XS"
                },
                "38": {
                      "quantity": 16,
                      "size": "S"
                },
                "39": {
                      "quantity": 17,
                      "size": "M"
                },
                //...
            }
       },
      // ...
  }
  ```

  ### Get related products of a single product
  Return all related products' id of single product

  `GET /products/:product_id/related`

  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the product for which data should be returned |

  Response: `Status: 200 OK`
  ```json
  [2,3,5,6]
  ```

---
## Installation
  1. In the terminal inside, run `npm run start` to start server
  2. Test by typing `http://localhost:5000/products` in the Postman to see the response.

---
## Other Services
Please reference Questions & Answers API Services that make up the Project Atelier API:
  - <a href='https://github.com/rpp34-sdc-blade/Retail-Q-A'>Questions & Answers</a> by Alan Li
