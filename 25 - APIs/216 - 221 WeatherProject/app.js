require("dotenv").config();

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

var weatherDescription = [];

const apiKey = process.env.APIKEY;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("cityGetter");
});

app.post("/", function(req, res){
  query = req.body.cityName;
  unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){

    response.on("data", function(data){
      weather = JSON.parse(data);
      weatherDescription.push(weather.weather[0].description);
      weatherDescription.push(query);
      weatherDescription.push(weather.main.temp);
      icon = weather.weather[0].icon;
      weatherDescription.push("https://openweathermap.org/img/wn/"+icon+"@2x.png");

      res.render("weatherDisplay", {items: weatherDescription});
    });
  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
