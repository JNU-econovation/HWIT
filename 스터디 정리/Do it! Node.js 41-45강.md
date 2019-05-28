# Do it! Node.js 41~45강

### 41강 몽구스 연결

mongo 대신 mongoose를 이용

```js
var mongoose = require('mongoose');
```

```js
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/local';
	 
	// 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	
	
	database.on('open', function () {
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		

		// 스키마 정의
		UserSchema = mongoose.Schema({
			id: String,
			name: String,
			password: String
		});
		console.log('UserSchema 정의함.');
		
		// UserModel 모델 정의
		UserModel = mongoose.model("users", UserSchema);
		console.log('UserModel 정의함.');
		
	});
    
    // 연결 끊어졌을 때 5초 후 재연결
	database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
        setInterval(connectDB, 5000);
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러.'));	
}
```

스키마를 정의 했고, 이제 데이터베이스를 접속해 조회, 추가 하는 방식을 몽구스에 맞게 변경하는 시간.



### 42강 라우팅 함수 변경

authUser을 UserModel을 통해 수정

```js
var authUser = function(database, id, password, callback) {
	console.log('authUser 호출됨 : ' + id + ', ' + password);
	
    // 아이디와 비밀번호를 이용해 검색
	UserModel.find({"id":id, "password":password}, function(err,docs) {
		if (err) {  // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
			callback(err, null);
			return;
		}
		
		console.log('아이디 [%s], 패스워드 [%s]로 사용자 검색결과', id, password);
		console.dir(docs);
		
	    if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
	    	callback(null, docs);
	    } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
	    	console.log("일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
	    }
	});
};
```

```js
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
	
	// UserModel 인스턴스 생성
	var user = new UserModel({"id":id, "password":password, "name":name});

	// save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
	user.save(function(err, addedUser) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("사용자 데이터 추가함.");
	    callback(null, addedUser);
	     
	});
};
```

지금까지 구현했던 것들을 mongoose형태로 바꿈

스키마 구현

### 43강 인덱스와 메소드 사용하기

스키마 타입 : String, Number, Boolean, Array, Buffer, Date, ObjectId, Mixed

Buffer 바이트 단위로 입출력 // 파일 처리 // 이미지도 가능

Schema 메소드를 통해 스키마를 정의하고UserSchema이름의 변수에 할당

Usermodel에서 유저 스키마 정보를 저장

type, required, unique, index 등의 정보를 추가할 수 있다.

##### UserModel : find(), save(), update(), remove() //조회 수정 삭제



static : 이런함수는 모델 객체에서 사용할 수 있다.

method : 

```js
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/local';
	 
	// 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	
	
	database.on('open', function () {
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		

		// 스키마 정의
		UserSchema = mongoose.Schema({
			id: {type : String, required : true, unique : true},
            password : {type : String, required : true},
			name:{type : String, index:'hashed'},
			age: {type : Number, 'default' : -1},
            created_at : {type : Date, index:{unique:false},'default':Date.now()},
            updated_at : {type : Date, index:{unique:false},'default':Date.now()}
		});
		console.log('UserSchema 정의함.');
		
        UserSchema.static('findById',function(id, callback){
           return this.find({id :id},callback); 
        });
        
        UserSchema.static('findAll', function(callback){
            return this.find({},callback);
        });
        
		// UserModel 모델 정의
		UserModel = mongoose.model("users2", UserSchema);
		console.log('UserModel 정의함.');
		
	});
    
    // 연결 끊어졌을 때 5초 후 재연결
	database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
        setInterval(connectDB, 5000);
    });
    
    database.on('error', console.error.bind(console, 'mongoose 연결 에러.'));	
}
```

### 44강 인덱스와 메서드 사용하기 이어서

static은 객체에다가 속성을 추가하는 방식

this 모델객체 참조



### 45강 비밀번호 암호화하여 저장하기

vitual 함수를 이용한 암호화 -> 이거는 46강에서!!

함수를 .으로 이어서 사용이 가능하다!!