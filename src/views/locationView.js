export const locationView = {
  elements: {
    location: null,
    locationBox: null,
    container: null,
  },

  init() {
    // Create element
    this.elements.locationBox = document.createElement('div')
    this.elements.location = document.createElement('p')

    this.elements.location.innerText = ''

    // Add attributes and classes
    this.elements.locationBox.classList.add('locationBox')
    this.elements.location.classList.add('location')

    // Add to the DOM
    this.elements.container = document.querySelector('.leftCol')
    this.elements.locationBox.appendChild(this.elements.location)
    this.elements.container.appendChild(this.elements.locationBox)
  },

  displayLocation(location) {
    this.elements.location.innerHTML = location
  },
}
