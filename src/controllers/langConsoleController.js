import { app } from '../app'

export const langConsoleController = {
  setLanguage(el) {
    if (el) {
      el.addEventListener('change', (e) => {
        app.setLanguage(e)
      })
    }
  },
}
