var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true});

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log("Db연결됨")
});

app.get("/", function(req, res) {
  res.send("여기는 가톨릭 대학교~");
  console.log("누군가가 접속했습니다:");
  console.log(">", req.headers["user-agent"]);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
