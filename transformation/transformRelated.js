const fs = require('fs');
const path = require('path');
const {parse, stringify} = require('csv');

fs.createReadStream('../csv/related.csv')
.pipe(parse())
//use parse() middleware to parse each row of csv to array
.on('data', (data) => {
  if(data[2] > 0 && data[2] < 1000012) {
    //the first argument of stringify() needs to be array of objects/arrays
    var arr = [data];
    //set header to be false, because I need to varify the data[2]'s value.
    //stringify object/array to csv format
    stringify(arr, {header: false}, function (err, output) {
      console.log(1);
      fs.appendFile(path.join(__dirname, '..', 'csv', 'cleanRelated.csv'), output, (err) => {
        if(err) {
          return console.log(err)
        }
      });
    })
  }
})
.on('end', () => {
  console.log('cleaned related csv file');
});





