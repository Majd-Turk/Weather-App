class Model {
  constructor() {
    this.citiesWeather = []
    this.LOCALHOST_URL = "http://localhost:3200/weather"
  }

  async getCitiesWeather() {
    try {
      const citiesWeatherArr = await $.get(`${this.LOCALHOST_URL}`)
      citiesWeatherArr.forEach((cityWeather) => {
        this.citiesWeather.push(cityWeather)
      });
      return citiesWeatherArr
    } catch (error) {
      alert(error.responseText)
      return false
    }
  }

  async getCityWeatherByName(cityName) {
    try {
      const cityWeather = await $.get(`${this.LOCALHOST_URL}/${cityName}`)
      this.citiesWeather.push(cityWeather)
      return cityWeather
    } catch (error) {
      alert(error.responseText)
      return false
    }
  }

  async saveCityWeatherData(cityData) {
    try {
      const savedCityWeather = await $.post(`${this.LOCALHOST_URL}`, cityData)
      return savedCityWeather
    } catch (error) {
      alert(error.responseText)
      return false
    }
  }

  deleteCityWeatherData(cityName) {
    return $.ajax({
      url: `${this.LOCALHOST_URL}/${cityName}`,
      type: "DELETE",
      success: (response) => {
        return true
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown)
        return false
      },
    });
  }

  getAndMapDataFromCityWeather(parent) {
    let childrens = parent.children()
    let cityName = childrens[0].textContent.trim()
    let conditionPic = childrens[1].dataset.icon
    let condition = childrens[2].textContent.trim()
    let temperature = childrens[3].textContent.trim()
    
  
    let cityData = {
      name: cityName,
      temperature: temperature,
      condition: condition,
      conditionPic: conditionPic,
    }

    return cityData
  }
}