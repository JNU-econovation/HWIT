var test = require('./realApi.js');
//
// console.log(test.getCityCode("서울특별시"));
// (async ()=>{
// 	console.log(await test.getTrainCode(test.getCityCode("서울특별시"),'왕십리'))
// })();


test.getTrainCode("11", '왕십리', function(da){
  console.log(da);
});

// console.log(test.getTrainCode(test.getCityCode("서울특별시"),'왕십리'));
// (async ()=>{
// 	console.log(await test.getTrainCode(test.getCityCode("광주광역시"),'광주송정'))
// })();

// (async ()=>{
// 	console.log(await test.getTrainTime('NAT010000', 'NAT011668', '20161001'))
// })();
//console.log(dat);

test.getTrainCode("NAT010000", 'NAT011668', 20161001);
