// weatherAPI docs: https://www.weatherapi.com/docs/
// googleAPI docs: https://developers.google.com/maps/documentation/urls/get-started,
//                 https://developers.google.com/maps/documentation/geocoding/overview,

export const API = {
  settings: {
    weatherAPI: {
      baseUrl: 'https://api.weatherapi.com/v1/',
      apiKey: '39f3fbbef7b24efd938102015212206',
    },

    googleAPI: {
      baseUrl: 'https://maps.googleapis.com/maps/api/js',
      apiKey: 'AIzaSyBACMBGj6X-HGuUs82b8iE8eX94GNFkQ1w',
      geocodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
    },
  },

  location: {},

  weather: {},

  map: {},
}

const getData = async () => {
  const res = await fetch(`${API.baseUrl}search.json?key=${API.apiKey}&q=london`)
  const data = await res.json()
  if (data.error) {
    console.error(data.error.message)
  }
}
