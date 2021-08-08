import { backgroundChangeModel } from '../models/backgroundChangeModel'
import { backgroundChangeView } from '../views/backgroundChangeView'

export const backgroundChangeController = {
  backgroundChange(el) {
    if (el) {
      el.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('rotate')
        backgroundChangeModel.setBackground(backgroundChangeView.elements.rootElement)
      })
    }
  },
}
