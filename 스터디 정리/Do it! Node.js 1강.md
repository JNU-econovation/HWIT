### Do it! Node.js 1강

* Brackets을 사용한다...

뭔가 visual code같은 것 같다. text editor이다.

프로젝트 폴더 == 폴더

하위 내용들은 파일



### Do it! Node.js 2강

* Node.js도 다운을 받아야 한다....

CMD 창에서 node text1.js 를 치면 console 실행됨 (node 라는 명령어는 node를 exe를 사용한다는 의미.)

js파일은 = pc와 server에서 사용하기 위함

html = 브라우져에서 웹페이지로 보여주기 위함

브라캣은 실시간 미리보기가 강점이다.

브라캣의 확장 기능? = 확장 기능을 추가 설치가 가능하다.



### Do it! Node.js 3강

console.log에 대한 기능을 알아보는 시간이였다.

%d = 숫자

%s = 문자

%j = 자바스크립트 객체



### Do it! Node.js 4강

console.time

console.timeEnd

* 전역변수 

__filename

__dirname

* console 은 전역 객체이다.
* console.dir(process.argv);



process.argv.foreach();



### Do it! Node.js 5강

* 노드에서 모듈 사용하기

함수는 1급 객체이다. 중요한 객체!!!

방법 1

<main.js>

var module1 = require('module1');

module1.함수이름();

--------------------------------------------------

<module.js>

exports.함수이름 = 함수정의 ;



방법 2 (객체 할당 방법)

moudule.exports = calc;



### Do it! Node.js 6강

about 외장 모듈



### Do it! Node.js 7강

about 내장 모듈



## =====================3장=====================

### Do it! Node.js 8강

아무래도 서버와 pc환경에서 이용하도록 하는게 node.js지만 js를 이용하기 때문에 핵심적인

js내용을 숙지할 필요가 있다.

* 매우 중요 !!! => js 객체는 {} 중괄호로 만든다!!!
* .으로 접근하거나 []로 속성을 접근 할 수 있다.



### Do it! Node.js 9강

함수 정의는 function 키워드를 붙이고 파라미터 타입과 반환 값은 명시하지 않음.

함수를 변수에 할당할 수 있다.