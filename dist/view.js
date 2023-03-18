class Renderer {
  constructor() {
    this.citiesWeatherSource = $("#citiesWeather-template").html()
    this.citiesWeatherContainer = $("#citiesWeather-container")

    this.myCityWeatherContainer = $("#myCityWeather-container")
  }

  renderCitiesWeatherData(data) {
    this.citiesWeatherContainer.empty()
    const template = Handlebars.compile(this.citiesWeatherSource)
    const newHTML = template(data)
    this.citiesWeatherContainer.append(newHTML)
  }

  renderCityWeatherData(data) {
    const template = Handlebars.compile(this.citiesWeatherSource)
    const newHTML = template([data])
    this.citiesWeatherContainer.append(newHTML)
  }

  updateCityWeatherData(data) {
    let existingTemplates = $(".cityWeather__template")
    if (existingTemplates.length) {
      let firstTemplate = $(existingTemplates[0])
      firstTemplate.find(".cityWeather__name").text(data.name)
      firstTemplate.find(".cityWeather__temperature").text(data.temperature)
      firstTemplate.find(".cityWeather__description").text(data.description)
      firstTemplate.find(".cityWeather__icon").attr("src", data.icon)
    }
  }

  renderPagesEmpty() {
    this.citiesWeatherContainer.empty()
  }
}