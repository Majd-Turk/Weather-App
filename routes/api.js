const express = require("express")
const axios = require("axios")
const Weather = require("../model/weather")
const cityWeatherUtil = require("../utilities/weather-utilities")

const router = express.Router()
const API_KEY = "&appid=fd9ecc9a49202984ec536fee0880d92f"
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`

router.get("/weather/:city", function (req, res) {
  let city = req.params.city

  axios
    .get(`${WEATHER_URL}q=${city}${API_KEY}&units=metric`)
    .then(function (response) {

      let cityWeather = cityWeatherUtil.getCityData(response)
      res.send(cityWeather)
    })
    .catch(function (error) {
      res.status(404).send(`Couldn't find ${city} in weather API`)
    })
})


router.get("/weather", function (req, res) {
  Weather.find({}).then(function (weathers) {
    res.send(weathers)
  })
})

router.post("/weather", function (req, res) {
  let cityData = req.body

  Weather.findOne({ name: cityData.name }).then((weather) => {
    if (weather) {
      res.status(403).send(`${weather.name} already exists`)
      return
    }

    let cityWeather = cityWeatherUtil.getCityDataSchema(cityData)

    cityWeather.save().then((savedCityWeather) => {
      res.status(201).send(savedCityWeather)
    })
      .catch((error) => {
        res.status(400).send(false)
      })

  })
})

router.delete("/weather/:city", function (req, res) {
  let city = req.params.city

  Weather.deleteOne({ name: city }).then((deleted) => {
    if (deleted.deletedCount == 1) {
      res.send(`Deleted ${city} from DB`)
    } else {
      res.status(400).send(`Couldn't delete ${city} from DB`)
    }
  })
})

module.exports = router
