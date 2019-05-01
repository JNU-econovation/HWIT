var url = "http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo";
var numOfRows = 10;
var pageNo = 1;
var depPlaceId = 'NAT010000';
var arrPlaceId = 'NAT011668';
var depPlandTime = 20161001;
var trainGradeCode = 00;
var serviceKey = 'jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D';

var total = url+"?"+"serviceKey="+serviceKey+"&numOfRows="+numOfRows+"&pageNo="
            +pageNo+"&depPlaceId="+depPlaceId+"&arrPlaceId="+arrPlaceId+"depPlandTime="
            +depPlaceId+"&trainGradeCode="+trainGradeCode;

var request = require('request');
var cheerio = require('cheerio');
request(total,function(error, response, body){
  $ = cheerio.load(body);

  $('item').each(function(idx){
    let arrplacename = $(this).find('arrplacename').text();
    let depplacename = $(this).find('depplacename').text();

    console.log("hihi");
    console.log("${arrplacename} dfsfsd${depplacename}");
  });
  //if(!error&&response.statusCode==200)
    //console.log(body);
  });
