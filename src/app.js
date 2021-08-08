import './utils'

import { backgroundChangeView } from './views/backgroundChangeView'
import { langConsoleView } from './views/langConsoleView'
import { tempConsoleView } from './views/tempConsoleView'
import { searchLocationView } from './views/searchLocationView'
import { locationView } from './views/locationView'
import { dateView } from './views/dateView'
import { weatherInfoView } from './views/weatherInfoView'
import { weatherForecastView } from './views/weatherForecastView'
import { mapView } from './views/mapView'
import { coordinatesView } from './views/coordinatesView'
import { langConsoleController } from './controllers/langConsoleController'
import { backgroundChangeController } from './controllers/backgroundChangeController'
import { searchLocationController } from './controllers/searchLocationController'
import { API } from './utils/api'
import { translationRu } from './utils/languages/ru'
import { translate } from './utils/translate'

export const app = {
  elements: {
    rootElement: null,
    container: null,
    header: null,
    main: null,
    leftCol: null,
    rightCol: null,
    buttonsBox: null,
    searchBox: null,
    footer: null,
  },

  address: null,
  temp: 'C',
  lang: 'en',

  coordinates: {
    lat: 0,
    lon: 0,
    enumerable: true,
  },

  set setAddress(value) {
    app.address = value
  },

  set setTemp(value) {
    app.temp = value
  },

  set setLang(value) {
    app.lang = value
  },

  createElements(){ // Creates elements
    this.elements.rootElement = document.createElement('div')
    this.elements.container = document.createElement('div')
    this.elements.header = document.createElement('header')
    this.elements.main = document.createElement('main')
    this.elements.leftCol = document.createElement('div')
    this.elements.rightCol = document.createElement('div')
    this.elements.buttonsBox = document.createElement('div')
    this.elements.searchBox = document.createElement('div')
    this.elements.footer = document.createElement('footer')
  },

  setAttributes(){ // Add attributes and classes
    this.elements.rootElement.setAttribute('id', 'weather-app')
    this.elements.container.classList.add('container')
    this.elements.buttonsBox.classList.add('buttonsBox')
    this.elements.searchBox.classList.add('searchBox')
    this.elements.main.classList.add('mainContent')
    this.elements.leftCol.classList.add('leftCol')
    this.elements.rightCol.classList.add('rightCol')
  },

  addToDom(){ // Add to the DOM
    document.body.appendChild(this.elements.rootElement)
    this.elements.rootElement.appendChild(this.elements.container)
    this.elements.container.appendChild(this.elements.header)
    this.elements.container.appendChild(this.elements.main)
    this.elements.main.appendChild(this.elements.leftCol)
    this.elements.main.appendChild(this.elements.rightCol)
    this.elements.header.appendChild(this.elements.buttonsBox)
    this.elements.header.appendChild(this.elements.searchBox)
    this.elements.container.appendChild(this.elements.footer)
  },

  init() {
    this.createElements()
    this.setAttributes()
    this.addToDom()
  },

  displayData(location, currentWeather, temp, lang, forecast){
    locationView.displayLocation(`${location.region} ${location.country}`)
    weatherInfoView.displayWeatherInfo(currentWeather, temp)
    weatherForecastView.createForecastDays(forecast, temp, lang)
    coordinatesView.displayCoordinates(location)
    dateView.displayDate(lang)
  },

  displayTranslation(lang){
    const elementsToTranslate = document.querySelectorAll('[data-i18n]')
    if (lang === 'ru') {
      translate(elementsToTranslate, translationRu)
    } else {
      translate(elementsToTranslate, translationEn)
    }
  },

  // Request data and render UI (Model init)
  async getAddress(lat, lng) {
    const res = await fetch(`${API.settings.googleAPI.geocodeUrl}?latlng=${lat},${lng}&key=${API.settings.googleAPI.apiKey}`)
    const data = await res.json()
    if (data.error) {
      console.error(data.error.message)
    }
    return data
  },

  async getWeatherInfo(query, lang = 'en') {
    const res = await fetch(`${API.settings.weatherAPI.baseUrl}forecast.json?key=${API.settings.weatherAPI.apiKey}&lang=${lang}&q=${query}&days=3&aqi=no&alerts=no`)
    const data = await res.json()
    if (data.error) {
      console.error(data.error.message)
    }
    return data
  },

  renderUI(address = 'Minsk', lang = 'en', temp = 'C') {
    app.getWeatherInfo(address, lang).then((res) => {
      const { location } = res
      const { current } = res
      const { forecast } = res

      const forecastBox = document.querySelector('.weatherForecastBox') // Removing previous forecast block
      removeElements(forecastBox)

      // Display the data on the UI
      app.displayData(location, current, temp, lang, forecast.forecastday)
      app.displayTranslation(lang)

      searchLocationView.elements.inputField.value = '' // Clear the search field
    })
  },

  error() {
    alert('Location is not define')
  },

  success(pos) {
    app.mapInit(+pos.coords.latitude.toFixed(2), +pos.coords.longitude.toFixed(2))
    // Get location
    app.getAddress(+pos.coords.latitude.toFixed(), +pos.coords.longitude.toFixed()).then((res) => {
      app.setAddress = res.results[2].formatted_address
      app.renderUI(app.address, app.lang, app.temp) // Get data from the server and render
    })
  },

  setTemperatureUnits(el) { // Switching temp units
    if (el) {
      el.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          app.setTemp = e.currentTarget.value
          app.renderUI(app.address, app.lang, app.temp) // Get data from the server and render
        })
      })
    }
  },

  onSearchLocation: (form) => { // Searching location
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      app.setAddress = formData.get('query')
      app.renderUI(app.address, app.lang, app.temp) // Get data from the server and render
    })
  },

  mapInit(lat, lon) { // Google Map initialization
    const script = document.body.querySelector('script') // Get google map script
    script.addEventListener('load', () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat,
          lng: lon,
        },
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      const input = document.getElementById('pac-input')
      const searchBox = new google.maps.places.SearchBox(input)

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds())
      })
      let markers = []
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (places.length === 0) {
          return
        }

        markers.forEach((marker) => {
          marker.setMap(null)
        })
        markers = []
        const bounds = new google.maps.LatLngBounds()
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log('Returned place contains no geometry')
            return
          }
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          }
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            }),
          )

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        map.fitBounds(bounds)
      })
    })
  },

  setLanguage: (e) => { // Switching languages
    app.setLang = e.currentTarget.value

    switch (e.currentTarget.value) {
      case 'ru':
        app.renderUI(app.address, app.lang, app.temp) // Get data from the server and render
        break

      case 'en':
        app.renderUI(app.address, app.lang, app.temp) // Get data from the server and render
        break
    }
  },

  // Views init
  viewInitialization() {
    app.init()
    backgroundChangeView.init()
    langConsoleView.init()
    tempConsoleView.init()
    locationView.init()
    dateView.init()
    mapView.init()
    searchLocationView.init()
    weatherInfoView.init()
    weatherForecastView.init()
    coordinatesView.init()
  },

  // Controllers init
  controllerInitialization() {
    const bgChangeButton = document.getElementById('bgChange')
    const form = document.querySelector('form')
    const langConsole = document.querySelector('select')

    app.setTemperatureUnits(tempConsoleView.elements.buttons)
    backgroundChangeController.backgroundChange(bgChangeButton)
    searchLocationController.searchLocation(form)
    langConsoleController.setLanguage(langConsole)
  },
}

navigator.geolocation.getCurrentPosition(app.success, app.error)

const removeElements = (parent) => { // Removing all elements from the DOM
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
    parent.innerHTML = ''
  }
}

document.addEventListener('DOMContentLoaded', () => { // Modules Initialization
  app.viewInitialization()
  app.controllerInitialization()
})
