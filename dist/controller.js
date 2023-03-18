const renderer = new Renderer()
const model = new Model()

const cityNameInput = $("#cityName-input")

const displayCitiesWeatherPage = function () {
  model.getCitiesWeather().then(function (citiesWeather) {
    renderer.renderCitiesWeatherData(citiesWeather)
  })
}

const displayCityWeather = function () {
  let cityName = cityNameInput.val()

  if (cityName != "") {
    model.getCityWeatherByName(cityName).then(function (cityWeather) {
      if (cityWeather) {
        renderer.renderCityWeatherData(cityWeather)
      }
    })
  }
}

const saveCityWeather = function () {
  let parent = $(this).closest(".cityWeather")

  let cityData = model.getAndMapDataFromCityWeather(parent)

  model.saveCityWeatherData(cityData).then((savedCityWeather) => {
    if (savedCityWeather) {
      if (createNew) {
        renderer.renderCityWeatherData(savedCityWeather)
      } else {
        renderer.updateCityWeatherData(savedCityWeather)
      }
    }
  })
}

const deleteCityWeather = function () {
  let parent = $(this).closest(".cityWeather")

  let cityData = model.getAndMapDataFromCityWeather(parent)

  model.deleteCityWeatherData(cityData.name)
  parent.remove()
}

displayCitiesWeatherPage()

$(".buttonCityName").on("click", displayCityWeather)

$("body").on("click", ".saveCity", saveCityWeather)

$("body").on("click", ".deleteCity", deleteCityWeather)
