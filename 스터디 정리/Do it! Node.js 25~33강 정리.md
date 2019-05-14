# Do it! Node.js 25~33강 정리

### 25강 미들웨어를 여러개 등록

```js
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){ //이부분이 미들웨어
    console.log('첫번째 미들웨어 호출됨. ');
    
    req.user = 'mike';
    
    next(); //미들 웨어를 떠난다.
    
   
});

app.use(function(req,res,next){
    console.log('두번째 미들웨어 호출됨.');
    
    res.writeHead(200,{"Content-Type":"test/html;charset=utf8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' +req.user +'</h1>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```



![1557668473641](C:\Users\Owner\AppData\Roaming\Typora\typora-user-images\1557668473641.png)

res.writeHead

res.end 를 줄여서

res.send로 간단히 쓸수 있다.



res.send를 객체로써 전달 하면 json포맷으로 전달된다.

객체를 send로 보내면 json형식으로 오고, 직접 json으로 바꿔서 보내줄 수도 있다.

```js
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){ //이부분이 미들웨어
    console.log('첫번째 미들웨어 호출됨. ');
    
    req.user = 'mike';
    
    next(); //미들 웨어를 떠난다.
    
   
});

app.use(function(req,res,next){
    console.log('두번째 미들웨어 호출됨.');
    
    //res.send('<h1>서버에서 응답한 결과입니다. : ' +req.user +'</h1>');
    var person = {name : '블랙핑크', age : 20};
    //res.send(person);
    var personStr = JSON.stringify(person); //JSON형식으로 변환
    //res.send(personStr);
    
    res.writeHead('200', {"Content-Type":"application/json;charset=utf8"});
    res.write(personStr);
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```

### 26강 미들웨어 여러개 이어서

>  res.redirect();를 사용 //자동으로 다른 페이지 혹은 다른 곳으로 이동 할 수 있도록 하는 기능!!! 재차 로그인 

get방식으로 요청 파라미터를 주소창에서 바로 받아 들임.

```js
var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){
    console.log('첫번째 미들웨어 호출됨. ');
    
    var userAgent = req.header('User-Agent');
    var paraName = req.query.name;
    
    res.send('<h3>서버에서 응답. User-Agent -> '+ userAgent+'</h3><h3>Param Name -> '+paraName+'</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```

>req를 통해 요청 파라미터를 확인하는 시간이였다.

### 27강 미들웨어 사용하기

미들웨어는 함수다. 기능을 추가하는거다.

웹브라우저에서 요청하는 것들을 미들웨어에서 처리해준다.

미들웨어는 이미 구현된 것들이 많다.

1. static 미들웨어

특정 폴더를 오픈하고 싶을때, 기본으로 제공하는 것들을 제공하고 싶을때,

```js
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));


app.use(function(req,res,next){
    console.log('첫번째 미들웨어 호출됨. ');
    
    var userAgent = req.header('User-Agent');
    var paraName = req.query.name;
    
    res.send('<h3>서버에서 응답. User-Agent -> '+ userAgent+'</h3><h3>Param Name -> '+paraName+'</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```

post 방식?????????

body-Parser를 이용

post방식은 body안으로 들어가서 처리...

라우터에서는 get방식 혹은 post방식 둘다 사용가능하다.

주소 표시줄에 넣는것은 get방식

post방식은 postman을 통해서 값을 전달해 봤다.

```js
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    console.log('첫번째 미들웨어 호출됨. ');
    
    var userAgent = req.header('User-Agent');
    var paraName = req.body.name || req.query.name;
    
    res.send('<h3>서버에서 응답. User-Agent -> '+ userAgent+'</h3><h3>Param Name -> '+paraName+'</h3>');
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});
```

### 28강 

post방식은 postman을 이용해서 한다.

요청파라미터의 이해가 중요하다..

미들웨어는 app.use()를 이용해서 등록이 가능하다.

미들웨어는 클라이언트의 요청이 들어왔을 때 수행해주는 기능을한다.

지금까지는 하나의 미들웨어가 다 같은 처리를 했는데 이제는 요청 패스에 따라서 다르게 처리해주도록 하고 싶다.



**라우터!!**

```js
var router = express.Router();

router.route('/process/login').post(function(req,res)){ }
```

get(callback)

post(callback)

put(callback)

delete(callback)

all(callback)

마지막에 app.user('/',router); 를 **꼭!**해줘야한다.



### 29강 라우팅에 대해서

라우팅은 특정 path만 처리하기 때문에 특정기능만 한다고 생각하면된다.

```js
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅함수에서 받음.');
    
    var paramId =req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 응답 </h1>");
    res.write("<div><p>"+ paramId+"</p></div>")
    res.write("<div><p>"+ paramPassword+"</p></div>")
    res.end();
});

app.use('/',router);
```



```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "UTF-8">
        <title>로그인</title>
    </head>
    <body>
        <h1>로그인</h1>
        <br>
        <form method = "post" action="/process/login2.html">
            <table>
                 <tr>
                    <td><label>아이디</label></td>
                    <td><input type = "text" name = "id"></td>
                </tr>
                <tr>
                    <td><label>비밀번호</label></td>
                    <td><input type = "password" name = "password"></td>
                </tr>
            </table>
            <input type = "submit" value="전송" name = "">
        </form>
    </body>
</html>
```

### url 파라미터 방식 요청



### 30강 쿠키와 세션에 대해서

쿠키 : login과련 / 브라우저에 저장되는 정보 / 상태정보를 유지하기 위해서 

세션 : 서버에서 관리함.

왜안돼지 실행이..

```js
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public',static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

var router = express.Router();

router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨.');
    
    res.cookie('user',{
        id : 'mike',
        name : '블랙핑크',
        authorized : true
    });
    c
    res.redirect('/process/showCookie');
    
    
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 라우팅 함수 호출됨.');
    
    res.send(req.cookies);
});

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅함수에서 받음.');
    
    var paramId =req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200,{"Content-Type" : "text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 응답 </h1>");
    res.write("<div><p>"+ paramId+"</p></div>")
    res.write("<div><p>"+ paramPassword+"</p></div>")
    res.end();
});

app.use('/',router);
```

