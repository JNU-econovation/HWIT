var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo';
var numOfRows = '10';
var pageNo = '1';
var depPlaceId = 'NAT010000';
var arrPlaceId = 'NAT011668';
var depPlandTime = '20161001';
var trainGradeCode = '00';
var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

var totalUrl = url+"?"+"serviceKey="+serviceKey+"&numOfRows="+numOfRows+"&pageNo="
            +pageNo+"&depPlaceId="+depPlaceId+"&arrPlaceId="+arrPlaceId+"&depPlandTime="
            +depPlandTime+"&trainGradeCode="+trainGradeCode;

var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

request({
      url: totalUrl,
      method: 'GET'
    }, function(error, response, body) {
  parser.parseString(body, function(err, result) {
    var obj = result.response.body[0].items[0].item;
    console.log(obj);
});
});
