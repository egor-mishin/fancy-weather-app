export const weatherForecastView = {
  elements: {
    weatherForecastBox: null,
    weatherForecastItems: null,
    container: null,
    address: null,
  },

  init() {
    // Create elements
    this.elements.weatherForecastBox = document.createElement('div')

    // Add attributes and classes
    this.elements.weatherForecastBox.classList.add('weatherForecastBox')

    // Add to the DOM
    this.elements.container = document.querySelector('.leftCol')
    this.elements.container.appendChild(this.elements.weatherForecastBox)
  },

  createForecastDays: (elements, units, lang) => {
    elements.forEach((el) => {
      const item = document.createElement('div')
      const date = new Date(el.date)
      item.classList.add('item')
      item.innerHTML = `<h4>${new Intl.DateTimeFormat(`${lang}`, { weekday: 'long' }).format(date)}</h4>
                             <div class="wrapper">
                                 <p>${units === 'C' ? `${Math.floor(el.day.avgtemp_c)}<sup>o</sup>` : `${Math.floor(el.day.avgtemp_f)}`}</p>
                              <img src=${el.day.condition.icon} alt=${el.day.condition.text}/> 
                            </div>`
      weatherForecastView.elements.weatherForecastBox.appendChild(item)
    })
  },
}
