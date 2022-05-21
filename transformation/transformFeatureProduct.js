const fs = require('fs');
const path = require('path');
const {parse, stringify} = require('csv');

var featureMap = {};
fs.createReadStream('../csv/uniqueFeatures.csv')
.pipe(parse())
.on('data', (data) => {
  var featureValue = `${data[1]} ${data[2]}`;
  featureMap[featureValue] = data[0];
})
.on('end', () => {
  console.log('featureMap', featureMap);
  fs.createReadStream('../csv/features.csv')
  .pipe(parse())
  .on('data', (data) => {
    var currFeatureValue = `${data[2]} ${data[3]}`;
    var featureId = featureMap[currFeatureValue];
    var newData = [[...data.slice(0, 2), featureId]];
    stringify(newData, {header: false}, function(err, output) {
      fs.appendFile(path.join(__dirname, '..', 'csv', 'productFeature.csv'), output, (err) => {
        if(err) {
          return console.log(err)
        }
      });
    })
  })
});
