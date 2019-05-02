var fs = require('fs');

fs.readFile('./carList.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);

    for (var i = 0; i < obj.records.length; i++) {
      console.log(obj.records[i].vehiclekndid+" "+obj.records[i].vehiclekndnm);
    }
});
