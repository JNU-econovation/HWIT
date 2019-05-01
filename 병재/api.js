var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo.json';
var numOfRows = '10';
var pageNo = '1';
var depPlaceId = 'NAT010000';
var arrPlaceId = 'NAT011668';
var depPlandTime = '20161001';
var trainGradeCode = '00';
var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

var total = url+"?"+"serviceKey="+serviceKey+"&numOfRows="+numOfRows+"&pageNo="
            +pageNo+"&depPlaceId="+depPlaceId+"&arrPlaceId="+arrPlaceId+"&depPlandTime="
            +depPlandTime+"&trainGradeCode="+trainGradeCode;

var totalUrl = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D&numOfRows=10&pageNo=1&depPlaceId=NAT010000&arrPlaceId=NAT011668&depPlandTime=20161001&trainGradeCode=00';
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

request({
    url: totalUrl,
    method: 'GET'
}, function (error, response, body) {

  parser.parseString(body, function(err, result) {
    var obj = result.response.body[0].items[0];
    console.log(obj);
});
});
