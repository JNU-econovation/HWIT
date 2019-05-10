# Do it! Node.js 강의 정리

### 19강 로그파일 남기기

버퍼 = 데이터가 들어가는 상자다.

로그를 남기는 방법을 배웠는데

wiston관련 모듈을 npm install을 통해 받았고

wiston 모듈에서 필요로 하는 속성대로 값을 설정해주면

에러 메세지 혹은 디버깅 메세지를 로그 파일로 저장해서 관리 할 수 있다.

* 뭔가 프로젝트와는 좀 연관성이 부족한 부분인거 같다는 생각이 들었다.



## Ch05

### 20강 웹 서버 만들기

중요한 파트이다.

웹서버를 만드는것이 node.js를 하는 이유다.

http와 express를 이용해서 웹서버를 만들게 된다.

```js
var http = require('http');
//웹서버를 담당한다.
//서버를 객체로 만든다.
var server  =  http.createServer();

var port = 3000;

server.listen(port, function(){
    console.log('웹서버가 실행되었습니다. : '+port);
});
```



### 21강 웹서버 만들기

init으로 보내고 on을 받는다.

```js
var http = require('http');

var server = http.createServer();

var host = '192.168.0.10';
var port = 3000;
server.listen(port, host, 50000, function(){ 
    console.log('웹서버 실행됨. '); //콜백함수가 아니라면 리턴으로는 해결해줄 수 없는것?
});


server.on('connection', function(socket) {
    console.log('클라이언트가 접속했습니다.');
});


server.on('request',function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    //console.dir(req);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write('<h1>웹서버로부터받은 응답 </h1>');
    res.end();
});
```



### 22강 웹서버 만들기

웹서버에서 이미지 출력

```js
var http = require('http');
var fs = require('fs');

var server = http.createServer();

var host = '192.168.0.10';
var port = 3000;
server.listen(port, host, 50000, function(){
    console.log('웹서버 실행됨. ');
});


server.on('connection', function(socket) {
    console.log('클라이언트가 접속했습니다.');
});


server.on('request',function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    var filename ='seob.jpg';
    fs.readFile(filename, function(err, data){
        res.writeHead(200,{"Content-Type":"image/jpg"});
        res.write(data);
        res.end();
    });
    
    
});

```

다른 웹서버로 부터 데이터를 받아와서 클라이언트에게 보여줄 수도 있다.

http모듈이 동작하는 방식을 배우는 시간이였다.

http만 가지고 사용하는게 아니라 express도 사용해야한다. 다음 강좌가 express에 관한 강좌이다.

express는 웹서버를 좀더 쉽게 만들어준다.



### 23강 익스프레스로 웹 서버 만들기

익스프레스 모듈을 사용해 좀 더 쉽게 서버 만들기

```js
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
// 응답을 보내주는 코드가 없다. 따라서 아무 반응이 없다.
```



### 24강 익스프레스로 웹 서버 만들기

미들웨어 넘기기 next

미들웨어 등록은 use

속성 가져오거나 설정 get / set

미들웨어에 대한 역할의 이해?????? 이해 안됬다;;

```js
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){
    console.log('첫번째 미들웨어 호출됨. ');
    
    res.writeHead(200,{"Content-Type":"test/html;charset=utf8"});
    res.end('<h1>서버에서 응답한 결과입니다.</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```

