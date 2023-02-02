import { computed } from 'vue'

export const TRIGGER_CLICK = 'click'
export const TRIGGER_HOVER = 'hover'
export const HOVER_RESPONSE_TIME = 150
export const GAP = 5

export function useAnimate (props, dropUp) {
  return computed(() => {
    if (typeof props.animated === 'string') {
      return props.animated
    }
    if (props.animated) {
      return dropUp.value ? 'animate-up' : 'animate-down'
    }
    return ''
  })
}

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
  const scrollTop = window.pageYOffset
  const viewHeight = document.documentElement.clientHeight
  const srcTop = props.rightClick ? y : rootRect.top + scrollTop
  let t = props.rightClick ? y : rootRect.top + rootRect.height + GAP + scrollTop
  let overDown = false
  let overUp = false
  let up = false
  // dropdown container over viewport
  if ((t + containerRect.height) > (scrollTop + viewHeight)) {
    overDown = true
  }
  if ((srcTop - GAP - containerRect.height) < scrollTop) {
    overUp = true
  }

  if (!overUp && overDown) {
    t = srcTop - GAP - containerRect.height
    up = true
  }

  return { dropUp: up, top: t }
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

/**
 * Get mouse x and y axis
 * @param {MouseEvent} e - mouse event object
 */
export function useMouseContextMenu (e) {
  const scrollPoint = scrollInfo()

  return {
    x: e.pageX || (e.clientX + scrollPoint.x),
    y: e.pageY || (e.clientY + scrollPoint.y)
  }
}

export function getContainerClasses (props) {
  return {
    'v-dropdown-container': true,
    'v-dropdown-no-border': !props.border
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
