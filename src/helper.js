/**
 * Get scroll info
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

/**
 * Calculation display direction and top axis
 * @param {object} props
 * @param {number} x
 * @param {DOMRect} rootRect - root element bounding client rect
 * @param {DOMRect} containerRect - container element bounding client rect
 * @return {{ dropUp: boolean, top: number }}
 */
export function adjustTop (props, y, rootRect, containerRect) {
  const gap = 5
  const scrollTop = window.pageYOffset
  const viewHeight = document.documentElement.clientHeight
  const srcTop = props.rightClick ? y : rootRect.top + scrollTop
  let t = props.rightClick ? y : rootRect.top + rootRect.height + gap + scrollTop
  let overDown = false
  let overUp = false
  let up = false
  // list over screen
  if ((t + containerRect.height) > (scrollTop + viewHeight)) {
    overDown = true
  }
  if ((srcTop - gap - containerRect.height) < scrollTop) {
    overUp = true
  }

  if (!overUp && overDown) {
    t = srcTop - gap - containerRect.height
    up = true
  }

  return {
    dropUp: up,
    top: t
  }
}
/**
 * Calculation left axis
 * @param {object} props
 * @param {number} x
 * @param {DOMRect} rootRect - root element bounding client rect
 * @param {DOMRect} containerRect - container element bounding client rect
 * @returns {number}
 */
export function adjustLeft (props, x, rootRect, containerRect) {
  const scrollLeft = window.pageXOffset
  const viewWid = document.documentElement.clientWidth
  const wid = props.rightClick ? 0 : rootRect.width
  // align left's left
  const left = props.rightClick ? x : rootRect.left + scrollLeft
  // align center's left
  const center = (left + (wid / 2)) - (containerRect.width / 2)
  // align right's left
  const right = (left + wid) - containerRect.width

  switch (props.align) {
    case 'left':
      return (left + containerRect.width) > (scrollLeft + viewWid) ? right : left
    case 'center':
      if ((center + containerRect.width) > (scrollLeft + viewWid)) {
        return right
      } else if (right < scrollLeft) {
        return left
      } else {
        return center
      }
    case 'right':
      return (right < scrollLeft) ? left : right
  }
}
