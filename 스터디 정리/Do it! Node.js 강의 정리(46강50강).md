# [AOA] Do it! Node.js 강의 정리(46강~50강)

### 46강 ~ 47강 비밀번호 암호화 이어서

암호화 모듈이 필요하다

```js
//암호화 모듈
var crypto = require('crypto');

...

UserSchema = mongoose.Schema({
			id: {type : String, required : true, unique : true, 'default':''},
            hashed_password : {type : String, required : true,'default':''},
            salt : {type :String, required : true}, //뭐하는 칼럼인지...
			name:{type : String, index:'hashed','default':''},
			age: {type : Number, 'default' : -1},
            created_at : {type : Date, index:{unique:false},'default':Date.now()},
            updated_at : {type : Date, index:{unique:false},'default':Date.now()}
		});
		console.log('UserSchema 정의함.');
// 여기까지 스키마 정의

//여기부터 virtual로 가상 속성 추가
<기존>
		UserSchema
            .virtual('password')
            .set(function(password){
                this._password = password;
            })
			.get()
// 원본 암호관련 데이터를 전달할 필요가 없기 때문에 .get()이 무의미하다.
<변경>
        UserSchema
            .virtual('password')
            .set(function(password){
                this.salt = this.makeSalt();
                this.hashed_password = this.ecryptPassword(password);
                console.log('virtual password 저장됨 : '+ this.hashed_password);
            });

//암호화 알고리즘 메소드 함수를 정의
        UserSchema.method('encryptPassword', function(plainText, inSalt){
            if(inSalt){
                return crypto.createHmac('shal',inSalt).update(plainText).digest('hex');
            } else {
                return crypto.createHmac('shal',this.salt).update(plainText).diget('hext');
            }
        });

//암호화가 매번 랜덤값에 의해 다르게 되도록
        UserSchema.method('makeSalt',function(){
            return Math.round((new Date().valueOf()*Math.random()))+'';
        });

//암호화한것을 원래 암호와 같은지 확인
        UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
           if(inSalt){
               console.log('authenticate 호출됨.');
               return this.encryptPassword(plainText,inSalt) === hashed_password;
           } else {
               console.log('authenticate 호출됨.');
               return this.encryptPassword(plainText) === hashed_password;
           }
        });

//authUser에서 password 확인 스크립트를 추가
            var user = new UserModel({id : id});
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
```

<오류가 생겼던 부분>

```js
    UserSchema.method('encryptPassword', function(plainText, inSalt) {
		if (inSalt) {
			return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
		} else {
			return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
		}
	});
        /*
     UserSchema.method('encryptPassword', function(plainText, inSalt){
        if(inSalt){
            return crypto.createHmac('shal',inSalt).update(plainText).digest('hex');
            } else {
                return crypto.createHmac('shal',this.salt).update(plainText).diget('hext');
            }
    });*/
        
```

비밀번호를 암호화해서 넣는 방법을 알아봤다.

virtual이 필수는 아니지만 이런 방법이 있다.



### 48강 MySQL과 같은 관계형 데이터 베이스에 연결하는 방법

데이터베이스 : 테이블의 집합

테이블 : 레코드의 집합 === 컬렉션

> 연결방법

**1단계 : 데이터베이스 연결**

---sql 사용---

**2단계 : 테이블 생성**

**3단계 : 레코드추가**

**4단계 : 데이터 조회**

```js
//mysql 할당
var mysql = require('mysql');

//===== MySQL 데이터베이스 연결 설정 =====//
var pool      =    mysql.createPool({ //poll이라는 객체로 데이터 베이스연결 실행이이루어짐
    connectionLimit : 10, 
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'test',
    debug    :  false
});
```



### 49강 MySQL에서 addUser나 authUser와 같은 메소드 처리

```js
//사용자를 등록하는 함수 === 데이터베이스 접근함수
var addUser = function(id, name, age, password, callback) {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name + ', ' + age);
	
	// 커넥션 풀에서 연결 객체를 가져옴
	pool.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {  //conn == 연결 객체
                conn.release();  // 반드시 해제해야 함 중요하다
            }
            
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);

    	// 데이터를 객체로 만듦
    	var data = {id:id, name:name, age:age, password:password};
    	
        // SQL 문을 실행함
        var exec = conn.query('insert into users set ?', data, function(err, result) {
        	conn.release();  // 반드시 해제해야 함
        	console.log('실행 대상 SQL : ' + exec.sql);
        	
        	if (err) {
        		console.log('SQL 실행 시 에러 발생함.');
        		console.dir(err);
        		
        		callback(err, null);
        		
        		return;
        	}
        	
        	callback(null, result);
        	
        });
        
        conn.on('error', function(err) {      
              console.log('데이터베이스 연결 시 에러 발생함.');
              console.dir(err);
              
              callback(err, null);
        });
    });
	
}



// 사용자 등록 라우팅 함수
router.route('/process/adduser').post(function(req, res) {
	console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ', ' + paramAge);
    
    // pool 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (pool) {
		addUser(paramId, paramName, paramAge, paramPassword, function(err, addedUser) {
			// 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 결과 객체 있으면 성공 응답 전송
			if (addedUser) {
				console.dir(addedUser);

				console.log('inserted ' + result.affectedRows + ' rows');
	        	
	        	var insertId = result.insertId;
	        	console.log('추가한 레코드의 아이디 : ' + insertId);
	        	
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
});
```

npm install mysql --save



### 50강 사용자 인증 함수를 변경

```js
// 사용자를 인증하는 함수
var authUser = function(id, password, callback) {
	console.log('authUser 호출됨 : ' + id + ', ' + password);
	
	// 커넥션 풀에서 연결 객체를 가져옴
	pool.getConnection(function(err, conn) {
        if (err) {
        	if (conn) {
                conn.release();  // 반드시 해제해야 함
            }
            callback(err, null);
            return;
        }   
        console.log('데이터베이스 연결 스레드 아이디 : ' + conn.threadId);
          
        var columns = ['id', 'name', 'age'];
        var tablename = 'users';
 
        // SQL 문을 실행합니다.
        var exec = conn.query("select ?? from ?? where id = ? and password = ?", [columns, tablename, id, password], function(err, rows) {
            conn.release();  // 반드시 해제해야 함
            console.log('실행 대상 SQL : ' + exec.sql);
            
            if (rows.length > 0) {
    	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
    	    	callback(null, rows);
            } else {
            	console.log("일치하는 사용자를 찾지 못함.");
    	    	callback(null, null);
            }
        });

        conn.on('error', function(err) {      
            console.log('데이터베이스 연결 시 에러 발생함.');
            console.dir(err);
            
            callback(err, null);
      });
    });
	
}
```

MySQL를 사용하는 과정을 알아봤다.

SQL문만 잘 처리해주면 더 쉽다.