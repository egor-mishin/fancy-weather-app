export const backgroundChangeModel = {
  setBackground: (el) => {
    const imgIndex = Math.floor((Math.random() * 4) + 1)
    el.style.backgroundImage = `url('./assets/images/image-${imgIndex}.jpg')`
  },
}
