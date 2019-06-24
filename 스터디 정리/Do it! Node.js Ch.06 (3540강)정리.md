# Do it! Node.js Ch.06 (35~40강)정리

### 35강 데이터베이스 사용하기

몽고디비 : NoSQL

관계형 데이터 베이스 : MySQL, ORACLE

NoSQL => SQL문을 사용하지 않는 데이터 베이스

#### NoSQL

table === collection

document === 레코드  / 하나의 객체와 같다.

복잡한 데이터를 넣을 수 있지만, 통일된 방식으로 조회가 힘들다.

```
mongod --dbpath /users/owner/database/local
```

을 작성해줘야 **몽고디비 데이터베이스 서비스**가 실행된다.

1. mongo : mongodb연결

2. use local : 내컴퓨터 내에있는 폴더를 db저장소로 사용

3. ```
   db.users.insert({name:'소년시대',age:20})
   ```

   디비 테이블을 생성하지 않고도 객체를 저장이 가능

4. ```
   db.users.find().pretty()
   ```

   디비 확인



### 36강 몽고디비 이어서

웹서버에서 접속을해 데이터 저장 수정이 목표!



### 37강 몽고디비를 웹서버에 연결

몽고디비 외장모듈을 설치 

```js
//mongodb 모듈사용
var MongoClient = require('mongodb').MongoClient;

var database;

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017/local'; 
    
    MongoClient.connect(databaseUrl, function(err, db){
        if(err){
            console.log('데이터베이스 연결 시 에러 발생함.');
            return;
        }
        console.log('데이터베이스에 연결됨 : '+databaseUrl);
        database = db;
        
    }); //연결이 완료되면 콜백함수 실행
    
}
```



### 38강 로그인 함수 생성 및 데이터베이스 정보 호출

로그인 관련 라우팅 함수를 만들어서 데이터베이스로 부터 정보를 호출 하는 시간이였다.

사용자 조회였다.

### 39강 사용자 추가하는 기능에 대해

웹서버에서 데이터 처리 함수 만들기

요청에대한 처리 라우팅 생성

```js
//사용자 추가 함수
var addUser = function(db,id, password, name, callback){
    console.log('addUser 호출됨 : '+id+','+password+','+name);
    var users = db.collecion('users');
    
    users.insertMany([{"id":id,"password":password,"name":name}],
                    function(err,result){
        if(err){
            callback(err, null);
            return;
        }
        
        if(result.insertedCount > 0){
            console.log('사용자 추가됨 : '+result.insertedCount);
            callback(null, result);
        } else{
            console.log('추가된 레코드가 없음');
            callback(null,null);
        }
    });
    
};
```

### 40강 사용자 추가 이어서

roboMongo 다운로드

#### 몽구스 데이터베이스 이용

몽구스 = nosql에서 관계형 데이터베이스처럼 스키마를 기술할 수 있도록

몽고디비보다 좀 복잡해진다.