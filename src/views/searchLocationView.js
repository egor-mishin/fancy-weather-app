export const searchLocationView = {
  elements: {
    inputField: null,
    container: null,
    form: null,
    submitButton: null,
  },

  init() {
    // Create element
    this.elements.form = document.createElement('form')
    this.elements.inputField = document.createElement('input')
    this.elements.submitButton = document.createElement('input')
    this.elements.submitButton.innerText = 'Search'

    // Add attributes and classes
    this.elements.submitButton.classList.add('btn')
    this.elements.submitButton.setAttribute('type', 'submit')
    this.elements.submitButton.setAttribute('data-i18n', '')
    this.elements.submitButton.setAttribute('value', 'search')
    this.elements.inputField.setAttribute('placeholder', 'Enter city name')
    this.elements.inputField.setAttribute('name', 'query')
    this.elements.inputField.setAttribute('type', 'text')
    this.elements.inputField.setAttribute('id', 'pac-input')
    this.elements.inputField.setAttribute('data-i18n', '')

    // Add to the DOM
    this.elements.container = document.querySelector('.searchBox')
    this.elements.container.appendChild(this.elements.form)
    this.elements.form.appendChild(this.elements.inputField)
    this.elements.form.appendChild(this.elements.submitButton)
  },

}
