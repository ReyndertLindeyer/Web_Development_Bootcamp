//jshint esversion:6
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
  res.send("The result of the two numbers added is: " + (Number(req.body.num2) + Number(req.body.num1)));
});

app.get('/bmicalculator', function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/bmicalculator', function(req, res) {
  res.send("Your BMI is: " + (parseFloat(req.body.weight) / (parseFloat(req.body.height) * (parseFloat(req.body.height)))));
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
