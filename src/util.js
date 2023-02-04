/**
 * Get scroll information
 * @returns {{ x: number, y: number}}
 */
export function scrollInfo () {
  const supportPageOffset = window.pageXOffset !== undefined
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

  return {
    x: supportPageOffset
      ? window.pageXOffset
      : isCSS1Compat
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft,
    y: supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop
  }
}

function isHidden (el) {
  return window.getComputedStyle(el).display === 'none'
}

export function getElementRect (el) {
  if (isHidden(el)) {
    /**
     * change the way to hide dropdown container from
     * 'display:none' to 'visibility:hidden'
     * be used for get width and height
     */
    el.style.visibility = 'hidden'
    el.style.display = 'inline-block'
    const rect = el.getBoundingClientRect()
    /**
     * restore dropdown style after getting position data
     */
    el.style.visibility = 'visible'
    el.style.display = 'none'
    return rect
  }
  return el.getBoundingClientRect()
}
