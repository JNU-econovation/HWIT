// var fs = require('fs');
//
// fs.readFile('./cityList.json', 'utf8', function (err, data) {
//     if (err) throw err;
//     var obj = JSON.parse(data);
//     console.log(obj.records[0].cityname);
// });

var result = 0;
result = getCityCode('서울특별시');
console.log(result);

function getCityCode(regionName){
  var fs = require('fs');
  var result;
  var data = fs.readFileSync('./cityList.json', 'utf8');
  var obj = JSON.parse(data);
  for (var i = 0; i < obj.records.length; i++) {
    if(obj.records[i].cityname === regionName){
      return obj.records[i].citycode;
    }
  }
}
