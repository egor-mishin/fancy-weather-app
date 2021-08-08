export const coordinatesView = {
  elements: {
    coordinatesBox: null,
  },

  init() {
    // Create elements
    this.elements.coordinatesBox = document.createElement('div')

    // Add attributes and classes
    this.elements.coordinatesBox.classList.add('coordinatesBox')

    // Add to the DOM
    this.elements.container = document.querySelector('.rightCol')
    this.elements.container.appendChild(this.elements.coordinatesBox)
  },

  displayCoordinates(location) {
    this.elements.coordinatesBox.innerHTML = `<ul class="coordinatesList">
                                                    <li>
                                                    <p><dt data-i18n>latiitude:</dt><span>${location.lat}</span></p>
                                                    </li>
                                                    <li>
                                                    <p><dt data-i18n>longitude:</dt><span>${location.lon}</span></p>
                                                    </li>
                                                  </ul>`
  },
}
