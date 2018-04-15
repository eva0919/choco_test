var fs = require("fs");
var NodeCache = require("node-cache");
var myCache = new NodeCache();

function readfileWithCache(filename, callback) {
  myCache.get(filename, function(cacheErr, data) {
    if (!cacheErr) {
      if (data == undefined) {
        readfile(filename, callback);
      } else {
        callback(data);
      }
    } else {
      console.log(cacheErr);
    }
  });
}

function readfile(filename, callback) {
  fs.readFile(filename, "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var lifetime = 60 * 60 * 12;
    myCache.set(filename, data, lifetime, function(cacheErr, success) {
      if (!success) {
        console.log(cacheErr);
      }
      callback(data);
    });
  });
}

module.exports = {
  readfileWithCache: readfileWithCache,
  readfile: readfile
};
