import { langConsoleController } from '../controllers/langConsoleController'
import { tempConsoleController } from '../controllers/tempConsoleController'

export const tempConsoleView = {
  elements: {
    buttons: null,
    container: null,
    wrapper: null,
    symbols: ['F', 'C'],
  },

  init() {
    // Create element
    this.elements.wrapper = document.createElement('div')

    // Add classes
    this.elements.wrapper.classList.add('tempConsole')

    // Add to the DOM
    this.elements.container = document.querySelector('.buttonsBox')
    this.elements.container.appendChild(this.elements.wrapper)
    this.createButtons()

    this.elements.buttons = this.elements.wrapper.querySelectorAll('button') // Get buttons collection
  },

  createButtons() {
    this.elements.symbols.forEach((btn) => {
      const button = document.createElement('button')
      button.setAttribute('value', `${btn}`)
      this.elements.wrapper.appendChild(button)
      button.classList.add('btn')
      button.innerHTML = `${btn} <sup>0</sup>`
    })
  },
}
