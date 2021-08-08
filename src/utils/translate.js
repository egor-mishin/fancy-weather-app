export const translate = (elementsToTranslate, translations) => {
  elementsToTranslate.forEach((el) => {
    el.textContent = translations[el.textContent]
  })
}
