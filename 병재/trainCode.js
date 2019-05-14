console.log(trainCode("f","Fds"));

function trainCode(regionCode, trainName){
  var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyAcctoTrainSttnList';
  var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

  var totalUrl = url + '?' + 'serviceKey=' + serviceKey + '&cityCode=' + '11';

  var request = require('request');
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  var testName = '왕십리';
  var result;
  request({
    url: totalUrl,
    method: 'GET'
  }, function(error, response, body) {
    parser.parseString(body, function(err, result) {
      var obj = result.response.body[0].items[0].item;

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].nodename[0] === testName) {
          result =obj[i].nodeid[0];
          break;
        }
      }
    });
  });
  return result;
}
