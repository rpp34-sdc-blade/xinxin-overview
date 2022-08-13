# :shopping_cart: Products API services :shopping:
Project Atelier's Products API Service is responsible for CRUD operations on Product's overview data. Due to increased demands of production traffic, it replaced the existing API with a back end system design that can support the full data set and scaled to 1500 requests per second (RPS) with a latency of < 10ms and 0% error rate.

---
## Table of Contents
  - <a href='#system-design'>System Design</a>
  - <a href='#usage'>Usage</a>
  - <a href='#installation'>Installation</a>
  - <a href='#other-services'>Other Services</a>

---
## System Design
  ### Architecture
  ![Architecture](https://github.com/rpp33-sdc-violet/Products/blob/main/readmePhoto/backend%20architecture.png)
  ### Stress Test Results
  ![Stress Test Results](https://github.com/rpp33-sdc-violet/Products/blob/main/readmePhoto/1800rps.png)

  ### Tech Stack
  |     |     |    |
  | ------- | ------- | ------- |
  | Node.js | Express | MongoDB |
  | NGINX   | AWS EC2 | Docker  |
  | Jest    | SuperTest | Artillery |
  | Loader.io | New Relic | Bluebird |

---
## Usage
  ### List all products
  Returns a list of all products of the retail website.

  `GET /products/`

  Response: `Status: 200 OK`
  ```json
  [
    {
    "id":7,
    "name":"Blues Suede Shoes",
    "slogan":"2019 Stanley Cup Limited Edition",
    "description":"Touch down in the land of the Delta Blues in the middle of the pouring rain","category":"Dress Shoes",
    "default_price":120
    },
    {
      "id":9,
      "name":"Summer Shoes",
      "slogan":"A risky call in the spring or fall",
      "description":"Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.",
      "category":"Kicks",
      "default_price":59
    },
    {
      ...
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
    "id":7,"name":"Blues Suede Shoes",
    "slogan":"2019 Stanley Cup Limited Edition",
    "description":"Touch down in the land of the Delta Blues in the middle of the pouring rain","category":"Dress Shoes",
    "default_price":"120",
    "features":[
      {"feature":"Sole","value":"Rubber"},
      {"feature":"Material","value":"FullControlSkin"},
      {"feature":"Stitching","value":"Double Stitch"}
    ]
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
    "product_id":"10",
    "results":[
      {
        "style_id":52,
        "name":"Soul",
        "original_price":"500000000",
        "sale_price":null,
        "default?":false,
        "photos":[
          {
            "url":"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/0a/Space_Stone_VFX.png/revision/latest?cb=20190427012702",
            "thumbnail_url":"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/0a/Space_Stone_VFX.png/revision/latest?cb=20190427012702"
          }
        ],
        "skus":{}
      },
      {
        "style_id":48,
        "name":"Space",
        ...
      },
      ...
    ]
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
  ### Set up MongoDB:
  1. run MongoDB in your local machine or EC2 with your faviorite command
  ```
  brew services start mongodb-community@5.0
  ```
  2. create database name SDC
  ```
  use SDC
  ```
  3. Set up username and password to access database

  ### For Dockerized service:
  1. Choose version in this link: `https://hub.docker.com/repository/docker/12514/sdc-violet-product`
  2. inside EC2 shell, run:
  ```
  docker run -p 80:8080  --env MONGO_USER=[username] --env MONGO_PW=[password] --env EC2_IP_DB=[ip address of the deployed database] --env LOADERIO_TOKEN=[loader.io token] --env NEW_RELIC_ENABLED=[false] 12514/sdc-violet-product:version-amd64-8
  ```

  ### To access the service without using docker:
  1. clone the repository
  2. run `npm install` to install all dependencies
  3. copy and paste file name
  ```
  .sampleEnv
  ```
  4. change file name from "sampleEnv" to ".env"
  5. update all variable inside .env file
  ```
  MONGO_USER= [mongodb username]
  MONGO_PW=  [mongodb password]
  EC2_IP_DB= [IP address of the EC2 deployed database]/[or blank if using localhost]
  LOADERIO_TOKEN= [loader.io token for load testing]
  NEW_RELIC_ENABLED= [True/False]
  ```

  6. In the file dbConnection.js, switch between two options localhost and EC2.

  - :point_right: OPTION1: Using Database deployed in EC2 + MongoDB has username & PW
  ```
  mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.EC2_IP_DB}:27017/SDC`)
  ```

  - :point_right: OPTION2: Using database in a local machine
  ```
  mongoose.connect(`mongodb://localhost:27017/SDC`)
  ```

  8. in the terminal inside, run `npm build`
  9. test by typing `http://localhost:8080/products` in the browser to see the response.
  10. run `npm start` to start the server

---
## Other Services
Please reference the Reviews & Ratings and Questions & Answers API Services that make up the Project Atelier API:
  - <a href='https://github.com/rpp33-sdc-violet/reviews-service'>Reviews & Ratings</a> by Joann Whang
  - <a href='https://github.com/rpp33-sdc-violet/questions-answers'>Questions & Answers</a> by Thao Nguyen
