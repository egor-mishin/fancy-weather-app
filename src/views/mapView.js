import { API } from '../utils/api'

export const mapView = {
  elements: {
    mapBox: null,
    mapScript: null,
    container: null,
  },

  init() {
    // Create elements
    this.elements.mapBox = document.createElement('div')

    // Add JS map script
    this.elements.mapScript = document.createElement('script')
    this.elements.mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API.settings.googleAPI.apiKey}&libraries=places`

    // Add attributes and classes
    this.elements.mapBox.classList.add('mapBox')
    this.elements.mapBox.setAttribute('id', 'map')

    // Add to the DOM
    this.elements.container = document.querySelector('.rightCol')
    this.elements.container.appendChild(this.elements.mapBox)
    document.body.appendChild(this.elements.mapScript)
  },
}
