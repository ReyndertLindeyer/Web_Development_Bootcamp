//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
  var today = new Date();
  var currentDay = today.getDay();

  if(currentDay == 6 || currentDay == 0){
    res.send("Yay it's the weekend!");
  }
  else{
    res.sendfile(__dirname + "/index.html");
  }
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
