export.module = function(departure, arrival, time){
    var fs = require('fs');

  fs.readFile('./cityList.json', 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);

      for (var i = 0; i < obj.records.length; i++) {
        if(departure.depRegion === obj.records[i].cityname){
          var depRegionCode = obj.records[i].citycode;
          break;
        }
      }
  });

  request({
      url: createURL(depRegionCode),
      method: 'GET'
  }, function (error, response, body) {

    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;

      for (var i = 0; i < obj.length; i++) {
        obj[i]
      }
  });
  });


}

function createURL(cityCode){
  var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo';
  var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  re url + '?' + 'serviceKey='+ serviceKey + '&cityCode='+cityCode;
}
