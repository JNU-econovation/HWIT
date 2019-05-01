var fs = require('fs');

fs.readFile('./cityList.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj.fields);
    console.log(obj.records);
});
