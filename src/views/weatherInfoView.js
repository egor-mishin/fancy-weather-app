import { tempConsoleController } from '../controllers/tempConsoleController'

export const weatherInfoView = {
  elements: {
    weatherInfoBox: null,
    tempBox: null,
    detailsBox: null,
    container: null,
    address: null,
  },

  init() {
    // Create element
    this.elements.weatherInfoBox = document.createElement('div')
    this.elements.tempBox = document.createElement('div')

    this.elements.detailsBox = document.createElement('div')

    // Add attributes and classes
    this.elements.weatherInfoBox.classList.add('weatherInfoBox')
    this.elements.tempBox.classList.add('tempBox')
    this.elements.detailsBox.classList.add('detailsBox')

    // Add to the DOM
    this.elements.container = document.querySelector('.leftCol')
    this.elements.container.appendChild(this.elements.weatherInfoBox)
    this.elements.weatherInfoBox.appendChild(this.elements.tempBox)
    this.elements.weatherInfoBox.appendChild(this.elements.detailsBox)
  },

  displayWeatherInfo(data, units) {
    this.elements.tempBox.innerHTML = `<p class="temp">${units === 'C' ? Math.floor(data.temp_c) : Math.floor(data.temp_f)}</p>
                                           <img src=${data.condition.icon} alt=${data.condition.text}>`
    this.elements.detailsBox.innerHTML = `<h3 class="detailsTitle">${data.condition.text}</h3>
                                                 <ul class="detailsList">
                                                    <li><span data-i18n>Feels like:</span> <p>${units === 'C' ? `${Math.floor(data.feelslike_c)}<sup>o</sup>` : `${Math.floor(data.feelslike_f)}`}</p></lid>
                                                    <li><span data-i18n>Wind:</span><p>${data.wind_kph} m/s</p></lid>
                                                    <li><span data-i18n>Humidity:</span><p>${data.humidity} %</p></lid>
                                                </ul>`
  },
}
