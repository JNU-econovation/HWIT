var request = require('request');

var url = 'http://openapi.tago.go.kr/openapi/service/TrainInfoService/getCtyCodeList';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=jxBxcZrc8JhQ7nNGuLjCrp4EzZ81v1YTowlTLBJiZdYh23K02yVU4%2BlByJ6U7v2RKLZ9FJn%2B5ORy7R3LKb%2BC5w%3D%3D'; /* Service Key*/

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    //console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
