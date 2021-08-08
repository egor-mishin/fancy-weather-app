export const dateView = {
  elements: {
    container: null,
    dateBox: null,
    today: null,
    date: null,
    format: null,
  },

  init() {
    // Date object
    this.elements.today = new Date()

    // Date format
    this.elements.format = {
      year: 'numeric',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }

    // Create elements
    this.elements.dateBox = document.createElement('div')

    this.elements.date = document.createElement('p')

    // Add attributes and classes
    this.elements.dateBox.classList.add('dateBox')
    this.elements.date.classList.add('date')

    // Add to the DOM
    this.elements.container = document.querySelector('.leftCol')
    this.elements.container.appendChild(this.elements.dateBox)
    this.elements.dateBox.appendChild(this.elements.date)
  },

  displayDate(lang) {
    this.elements.date.innerText = `${new Intl.DateTimeFormat(`${lang}`, this.elements.format).format(this.elements.today)}`
  },
}
