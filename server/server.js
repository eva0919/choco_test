var express = require("express");
var path = require("path");

var server_utils = require("./server_utils.js");

var app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/dramas", function(req, res) {
  console.log("/api/dramas");
  server_utils.readfileWithCache(__dirname + "/src/drama-list.json", function(
    data
  ) {
    res.json(JSON.parse(data));
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

app.listen(app.get("port"), function() {
  console.log("Example app listening on port 3000!");
});
