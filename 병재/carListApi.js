var fs = require('fs');

fs.readFile('./carList.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj.fields[0].id);
    console.log(obj.records[0].vehiclekndid);
});
