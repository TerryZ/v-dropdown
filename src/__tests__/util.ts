export function getCssStyle (el) {
  return window.getComputedStyle(el, null)
}

export function getCssDisplay (el) {
  return getCssStyle(el).display
}
