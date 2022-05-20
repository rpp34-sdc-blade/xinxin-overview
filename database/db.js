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
  var values = [page * count, count];
  pool.query(query, values)
  .then(res=> {
    console.log(res);
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  getProducts
}

