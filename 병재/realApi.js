module.exports = {
  getCityCode: getCityCode,
  getTrainCode: getTrainCode,
  getTrainTime: getTrainTime
};

function getCityCode(regionName){ //지역 코드 가져오기
  var fs = require('fs');

  var data = fs.readFileSync('./cityList.json', 'utf8');
  var obj = JSON.parse(data);
  for (var i = 0; i < obj.records.length; i++) {
    if(obj.records[i].cityname === regionName){
      return obj.records[i].citycode;
    }
  }
}

async function getTrainCode(stationName, callback){
  var request = require('request');
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList';
  var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  var totalUrl = url + '?' + 'serviceKey=' + serviceKey + '&cityCode=' + '11';
  return new Promise(resolve=>{
  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {
    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nodename[0] === stationName) {
          console.log(obj[i].nodeid[0]);
          return obj[i].nodeid[0];
        }
      }
    });
  });
});
}

 async function getTrainTime(depPlaceId, arrPlaceId, depPlandTime){
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
return new Promise(resolve=>{
  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {
    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;
      console.log(obj);
  });
    });
  });
}
