const fs = require('fs');
const path = require('path');
const {parse, stringify} = require('csv');

fs.createReadStream('../data/features.csv')
.pipe(parse())
.on('data', (data) => {
  var arr = [data.slice(2)];
  stringify(arr, {header: false}, function (err, output) {
    fs.appendFile(path.join(__dirname, '..', 'data', 'duplicatedFeatures.csv'), output, (err) => {
      if(err) {
        return console.log(err)
      }
    });
  })
})
.on('end', () => {
  console.log('get all feature and value columns data');
});
