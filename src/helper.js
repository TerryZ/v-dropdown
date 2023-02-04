import { computed } from 'vue'
import { scrollInfo } from './util'
export { getElementRect } from './util'

export const TRIGGER_CLICK = 'click'
export const TRIGGER_HOVER = 'hover'
export const TRIGGER_CONTEXTMENU = 'contextmenu'
export const HOVER_RESPONSE_TIME = 150
export const GAP = 5

export function getAnimate (props, dropUp) {
  if (typeof props.animated === 'string') {
    return props.animated
  }
  if (!props.animated) return ''
  return dropUp.value ? 'animate-up' : 'animate-down'
}

export function useState (props) {
  return {
    isTriggerByClick: props.trigger === TRIGGER_CLICK,
    isTriggerByHover: props.trigger === TRIGGER_HOVER,
    isTriggerByContextmenu: props.trigger === TRIGGER_CONTEXTMENU
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
  const { isTriggerByContextmenu } = useState(props)
  const scrollTop = window.pageYOffset
  const viewHeight = document.documentElement.clientHeight
  const srcTop = isTriggerByContextmenu ? y : rootRect.top + scrollTop
  let t = isTriggerByContextmenu ? y : rootRect.top + rootRect.height + GAP + scrollTop
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
  const { isTriggerByContextmenu } = useState(props)
  const scrollLeft = window.pageXOffset
  const viewWid = document.documentElement.clientWidth
  const wid = isTriggerByContextmenu ? 0 : rootRect.width
  // align left's left
  const left = isTriggerByContextmenu ? x : rootRect.left + scrollLeft
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
