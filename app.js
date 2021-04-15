//local server up and running
const express = require("express");

//node internal request
const https = require("https");

const app = express();

app.get("/", function (req, res) {

    const query = "Lisbon";
    const apiKey = "3af2a1822cfe6d31e4317ac9c4b5d531";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){

            //convert hexadecimal to js
            const weatherData = JSON.parse(data);

            //asking the items that we want
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " +weatherDescription + "</p>");
            res.write("<h1>The temperature in " + cityName + " is " + Math.round(temp) + " degree Celsius</h1>");
            res.write("<img src=" + imgURL + ">");

            res.send();
        })
    });
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
});