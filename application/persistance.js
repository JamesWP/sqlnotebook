var fs = require('fs');

var path = id=>"saves/" + id + ".json";

module.exports = {
  get: function (id, callback) {
    fs.readFile(path(id), function(err, data) {
      if (err) {
          console.log("ERROR !! " + err);
      } else {
          callback(data);
      }
    });
  },
  put: function (id,dat) {
    console.log("writing", dat, path(id));
    fs.writeFile(path(id), dat, function(err) {
        if(err) {
            return console.log(err);
        }
    });
 }
};
