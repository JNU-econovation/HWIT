export.module = function(departure, arrival, time){

  var depRegionCode = getCityCode(departure.regionName);
  var arrRegionCode = getCityCode(arrival.regionName);

  var data = getTrainTime(getTrainCode(depRegionCode), getTrainCode(arrRegionCode), time)


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
  var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList';
  var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  var totalUrl = url + '?' + 'serviceKey=' + serviceKey + '&cityCode=' + '11';

  var testName = '왕십리';
  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {

    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nodename[0] === testName) {
          return obj[i].nodeid[0];
        }
      }
    });
  });
}

function getTrainTime(depPlaceId, arrPlaceId, depPlandTime){
  var trainGradeCode = '00'; //임시
  var request = require('request');
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  var numOfRows = 10;
  var pageNo = 1;

  var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo';
  var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  var totalUrl = url+"?"+"serviceKey="+serviceKey+"&numOfRows="+numOfRows+"&pageNo="
              +pageNo+"&depPlaceId="+depPlaceId+"&arrPlaceId="+arrPlaceId+"&depPlandTime="
              +depPlandTime+"&trainGradeCode="+trainGradeCode;

  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {
    return body;
    });
}
