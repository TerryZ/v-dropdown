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

function getElementSizes (el) {
  // 通过 getComputedStyle(el).width 获得的值更精准，精确到小数点后三位
  const rect = el.getBoundingClientRect()
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
    top: rect.top,
    left: rect.left
  }
}
export function getElementRect (el) {
  if (!el) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  }
  if (isHidden(el)) {
    /**
     * change the way to hide dropdown container from
     * 'display:none' to 'visibility:hidden'
     * be used for get width and height
     */
    el.style.visibility = 'hidden'
    el.style.display = 'inline-block'
    const rect = getElementSizes(el)
    /**
     * restore dropdown style after getting position data
     */
    el.style.visibility = 'visible'
    el.style.display = 'none'
    return rect
  }
  return getElementSizes(el)
}
