const Weather = require("../model/weather")

const getCityData = function (weather) {
    let cityData = weather.data

    let cityWeather = {
        name: cityData.name,
        temperature: Math.round(cityData.main.temp),
        condition: cityData.weather[0].description,
        conditionPic: cityData.weather[0].icon
    };

    return cityWeather
};

const getCityDataSchema = function (cityData) {

    let cityWeather = new Weather({
        name: cityData.name,
        temperature: cityData.temperature,
        condition: cityData.condition,
        conditionPic: cityData.conditionPic
    });

    return cityWeather
};

module.exports = { getCityData, getCityDataSchema }