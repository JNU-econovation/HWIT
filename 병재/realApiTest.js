var test = multiply = require('./realApi.js');

console.log(test.getCityCode("광주광역시"));
(async ()=>{
	console.log(await test.getTrainCode('왕십리'))
})();


(async ()=>{
	console.log(await test.getTrainTime('NAT010000', 'NAT011668', '20161001'))
})();
//console.log(dat);

// test.getTrainCode("NAT010000", 'NAT011668', 20161001);
