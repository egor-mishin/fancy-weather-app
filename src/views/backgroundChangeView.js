import { backgroundChangeController } from '../controllers/backgroundChangeController'

export const backgroundChangeView = {
  elements: {
    button: null,
    rootElement: null,
    container: null,
  },

  init() {
    // Create element
    this.elements.button = document.createElement('button')
    this.elements.button.innerHTML = '<img src="./assets/images/icons/refresh.svg" alt="" class="buttonIcon"/>'

    // Add classes
    this.elements.button.classList.add('btn')
    this.elements.button.setAttribute('id', 'bgChange')

    // Add to the DOM
    this.elements.rootElement = document.querySelector('#weather-app')
    this.elements.container = document.querySelector('.buttonsBox')
    this.elements.container.appendChild(this.elements.button)

    // Add styles
    this.elements.rootElement.style.backgroundImage = "url('./assets/images/image-1.jpg')"
  },
}
