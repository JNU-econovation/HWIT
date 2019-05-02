var fs = require('fs');

fs.readFile('./cityList.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);

    for (var i = 0; i < obj.records.length; i++) {
      console.log(obj.records[i].citycode+" "+obj.records[i].cityname);
    }
});
