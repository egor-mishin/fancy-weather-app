export const langConsoleView = {
  elements: {
    selectField: null,
    container: null,
    languages: ['En', 'Ru'],
  },

  init() {
    // Create element
    this.elements.selectField = document.createElement('select')

    // Add classes
    this.elements.selectField.classList.add('btn')

    // Add to the DOM
    this.elements.container = document.querySelector('.buttonsBox')
    this.elements.container.appendChild(this.elements.selectField)
    this.createSelectOptions()
  },

  createSelectOptions() {
    this.elements.languages.forEach((lang) => {
      const option = document.createElement('option')
      this.elements.selectField.appendChild(option)
      option.innerText = lang
      option.setAttribute('value', lang.toLowerCase())
    })
  },
}
