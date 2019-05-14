export.module = function(departure, arrival, time){



}



function getCityCode(regionName){ //지역 코드 가져오기
  var fs = require('fs');

  fs.readFile('./cityList.json', 'utf8', function (err, data) {
      if (err) throw err;
      var obj = JSON.parse(data);

      for (var i = 0; i < obj.records.length; i++) {
        console.log(obj.records[i].cityname + " " + obj.records[i].cityCode);
        if(obj.records[i].cityname === regionName){
          return obj.records[i].citycode;
        }
      }
  });
}

function getTrainCode(){
  var request = require('request');
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  const url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList';
  const serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  var totalUrl = url + '?' + 'serviceKey=' + serviceKey + '&cityCode=' + '11';

  var testName = '왕십리';
  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {

    //console.log(body);
    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nodename[0] === testName) {
          console.log(obj[i].nodeid[0]);
          break;
        }
      }
    });
  });

}
