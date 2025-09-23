import { ref, inject, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import { getTriggerState } from './helper'
import { getElementRect } from './util'
import {
  keyDropdown,
  DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_CENTER, DIRECTION_RIGHT
} from './constants'

export const useDropdown = () => inject(keyDropdown, {})
export function useDebounce (time = 300) {
  let timer

  return fn => {
    clearTimeout(timer)
    timer = setTimeout(fn, time)
  }
}
export function useThrottle (delay = 300) {
  let timer = null
  return fn => {
    if (timer) return
    timer = setTimeout(() => {
      fn?.()
      timer = null
    }, delay)
  }
}

export function useDropdownContentDirection (
  triggerRef,
  contentRef,
  position,
  direction,
  visible,
  props
) {
  const { trigger, gap, align } = props
  const { isTriggerByContextmenu } = getTriggerState(trigger)

  /**
   * Calculation display direction and top axis
   * @param {number} y
   * @param {DOMRect} triggerRect - trigger element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @return {number}
   */
  function getTop (y, triggerRect, contentRect) {
    // Reset direction when content is not visible
    if (!visible.value) {
      direction.value.vertical = DIRECTION_DOWN
    }

    const scrollTop = window.scrollY
    // The height value not include scroll bar
    const viewHeight = document.documentElement.clientHeight
    const startTop = isTriggerByContextmenu ? y : triggerRect.top + scrollTop
    const downwardTop = isTriggerByContextmenu
      ? y
      : triggerRect.top + triggerRect.height + gap + scrollTop
    const upwardTop = startTop - gap - contentRect.height
    // Is there enough space to expand downwards
    const overBelow = (downwardTop + contentRect.height) > (scrollTop + viewHeight)
    // Is there enough space to expand upwards
    const overAbove = upwardTop < scrollTop

    if (direction.value.vertical === DIRECTION_UP) {
      if (overAbove && !overBelow) {
        direction.value.vertical = DIRECTION_DOWN
        return downwardTop
      }
      return upwardTop
    }
    // Expand downwards by default
    if (!overAbove && overBelow) {
      direction.value.vertical = DIRECTION_UP
      return upwardTop
    }
    return downwardTop
  }
  /**
   * Calculation left axis
   * @param {number} x
   * @param {DOMRect} triggerRect - trigger element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @returns {number}
   */
  function getLeft (x, triggerRect, contentRect) {
    if (!visible.value) {
      direction.value.horizontal = DIRECTION_RIGHT
    }

    const scrollLeft = window.scrollX
    // The width value not include scroll bar
    const viewWidth = document.documentElement.clientWidth
    const triggerWidth = isTriggerByContextmenu ? 0 : triggerRect.width
    // Left axis of align left
    const leftOfAlignLeft = isTriggerByContextmenu ? x : triggerRect.left + scrollLeft
    // Left axis of align center
    const leftOfAlignCenter = (leftOfAlignLeft + (triggerWidth / 2)) - (contentRect.width / 2)
    // Left axis of align right
    const leftOfAlignRight = (leftOfAlignLeft + triggerWidth) - contentRect.width

    const isLeftOverRight = (leftOfAlignLeft + contentRect.width) > (scrollLeft + viewWidth)
    const isCenterOverRight = (leftOfAlignCenter + contentRect.width) > (scrollLeft + viewWidth)
    const isRightOverLeft = leftOfAlignRight < scrollLeft

    if (align.value === DIRECTION_CENTER) {
      direction.value.horizontal = isCenterOverRight ? DIRECTION_LEFT : DIRECTION_RIGHT
      return isCenterOverRight
        ? leftOfAlignRight
        : isRightOverLeft ? leftOfAlignLeft : leftOfAlignCenter
    }
    if (align.value === DIRECTION_RIGHT) {
      direction.value.horizontal = isRightOverLeft ? DIRECTION_RIGHT : DIRECTION_LEFT
      return isRightOverLeft ? leftOfAlignLeft : leftOfAlignRight
    }
    // Align to left by default
    direction.value.horizontal = isLeftOverRight ? DIRECTION_LEFT : DIRECTION_RIGHT
    return isLeftOverRight ? leftOfAlignRight : leftOfAlignLeft
  }

  function getDirection () {
    const triggerRect = getElementRect(triggerRef.value)
    const contentRect = getElementRect(contentRef.value)
    return {
      top: getTop(position.value.y, triggerRect, contentRect),
      left: getLeft(position.value.x, triggerRect, contentRect)
    }
  }

  return { getDirection }
}

export function useIntersectionObserver (contentRef, handler) {
  let observer = null

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0.5, 0.75, 1.0]
  }
  const EPS = 1e-7

  const handleObserver = entries => {
    const entry = entries[0]
    if (Math.abs(entry.intersectionRatio - 1) < EPS) return
    // console.log(entry)
    handler?.()
  }

  function startIntersectionObserving () {
    if (!contentRef.value) return

    if (!observer) {
      observer = new IntersectionObserver(handleObserver, options)
    }

    observer.observe(contentRef.value)
  }

  function stopIntersectionObserving () {
    if (!observer) return
    observer.unobserve(contentRef.value)
  }

  function cleanupObserver () {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onBeforeUnmount(cleanupObserver)

  return {
    startIntersectionObserving,
    stopIntersectionObserving
  }
}

export function useResizeObserver (triggerRef, contentRef, handler) {
  const isObserving = ref(false)
  const skipFirst = ref(false)
  let observer = null

  const handleResize = () => {
    // Skip first time callback when ResizeObserver observe elements
    if (!skipFirst.value) {
      skipFirst.value = true
      return
    }

    handler?.()
  }

  const startObserving = () => {
    if (!triggerRef.value || !contentRef.value || isObserving.value) return

    if (!observer) {
      observer = new ResizeObserver(handleResize)
    }

    observer.observe(triggerRef.value)
    observer.observe(contentRef.value)
    isObserving.value = true
  }

  const stopObserving = () => {
    if (!observer || !isObserving.value) return

    if (triggerRef.value && contentRef.value) {
      observer.unobserve(triggerRef.value)
      observer.unobserve(contentRef.value)
    }

    isObserving.value = false
    skipFirst.value = false
  }

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
      isObserving.value = false
      skipFirst.value = false
    }
  }

  onUnmounted(disconnect)

  return {
    startObserving,
    stopObserving
  }
}
/**
 *
 * @param {EventTarget | function} target
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions} options
 * @returns
 */
export function useEventListener (target, event, handler, options) {
  let el = null

  const cleanup = () => {
    if (!el) return
    el.removeEventListener(event, handler, options)
    el = null
  }

  onMounted(() => {
    el = typeof target === 'function' ? target() : target
    el?.addEventListener(event, handler, options)
  })

  onBeforeUnmount(cleanup)

  return cleanup
}
