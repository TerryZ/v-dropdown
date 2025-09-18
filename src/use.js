import {
  ref, computed, watch, inject, nextTick, readonly,
  onMounted, onBeforeUnmount, onUnmounted
} from 'vue'
import ResizeObserverPolyfill from 'resize-observer-polyfill'
import { getTriggerState } from './helper'
import { getElementRect } from './util'
import {
  keyDropdown,
  DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT
} from './constants'

export const useDropdown = () => inject(keyDropdown, {})
export function useDebounce (time = 300) {
  let timer

  return callback => {
    clearTimeout(timer)
    timer = setTimeout(callback, time)
  }
}

export function useDropdownContentDirection (triggerRef, contentRef, position, props) {
  const { trigger, align, gap, animated } = props
  const verticalDirection = ref('')
  const horizontalDirection = ref('')
  const transitionName = computed(() => {
    if (!animated) return ''
    return `drop-${verticalDirection.value}-${horizontalDirection.value}`
  })

  /**
   * Calculation display direction and top axis
   * @param {number} x
   * @param {DOMRect} triggerRect - root element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @return {number}
   */
  function getTop (y, triggerRect, contentRect) {
    verticalDirection.value = DIRECTION_DOWN

    const { isTriggerByContextmenu } = getTriggerState(trigger)
    const scrollTop = window.scrollY
    // The height value not include scroll bar
    const viewHeight = document.documentElement.clientHeight
    const srcTop = isTriggerByContextmenu ? y : triggerRect.top + scrollTop
    const top = isTriggerByContextmenu
      ? y
      : triggerRect.top + triggerRect.height + gap + scrollTop

    const overBottom = (top + contentRect.height) > (scrollTop + viewHeight)
    const overTop = (srcTop - gap - contentRect.height) < scrollTop

    if (!overTop && overBottom) {
      verticalDirection.value = DIRECTION_UP
      return srcTop - gap - contentRect.height
    }

    return top
  }
  /**
   * Calculation left axis
   * @param {number} x
   * @param {DOMRect} triggerRect - root element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @returns {number}
   */
  function getLeft (x, triggerRect, contentRect) {
    horizontalDirection.value = DIRECTION_RIGHT
    const { isTriggerByContextmenu } = getTriggerState(trigger)
    const scrollLeft = window.scrollX
    // The width value not include scroll bar
    const viewWidth = document.documentElement.clientWidth
    const width = isTriggerByContextmenu ? 0 : triggerRect.width
    // left axis of align left
    const left = isTriggerByContextmenu ? x : triggerRect.left + scrollLeft
    // left axis of align center
    const center = (left + (width / 2)) - (contentRect.width / 2)
    // left axis of align right
    const right = (left + width) - contentRect.width

    const isLeftOutOfViewOnRight = (left + contentRect.width) > (scrollLeft + viewWidth)
    const isCenterOutOfViewOnRight = (center + contentRect.width) > (scrollLeft + viewWidth)
    const isRightOutOfViewOnLeft = right < scrollLeft

    switch (align) {
      case 'left': return isLeftOutOfViewOnRight ? right : left
      case 'center': return isCenterOutOfViewOnRight
        ? right
        : isRightOutOfViewOnLeft ? left : center
      case 'right': return isRightOutOfViewOnLeft ? left : right
    }
  }

  function getDirection () {
    const triggerRect = getElementRect(triggerRef.value)
    const contentRect = getElementRect(contentRef.value)
    return {
      top: getTop(position.value.y, triggerRect, contentRect),
      left: getLeft(position.value.x, triggerRect, contentRect),
      transitionName: transitionName.value
    }
  }

  return { getDirection }
}

export function useContentSizeChangeHandle (content, job) {
  let width = 0
  let height = 0
  let resizeObserver
  const setSize = rect => {
    width = rect.width
    height = rect.height
  }
  const handleResize = entries => {
    const rect = entries[0].contentRect
    // console.log(rect)
    // content invisible
    if (!rect.width && !rect.height) return
    // storage content size when first time open
    if (width === 0 && height === 0) return setSize(rect)
    // content size changed
    if (width !== rect.width || height !== rect.height) {
      setSize(rect)
      job?.()
    }
  }
  onMounted(() => {
    if (!content.value) return

    const ResizeObserverObject = window?.ResizeObserver || ResizeObserverPolyfill
    resizeObserver = new ResizeObserverObject(handleResize)
    resizeObserver.observe(content.value)
  })
  onBeforeUnmount(() => {
    if (!resizeObserver || !content.value) return
    resizeObserver.unobserve(content.value)
  })
}
export function useTriggerPositionChange (trigger) {
  let left = 0
  let top = 0
  let height = 0

  const setPosition = rect => {
    left = rect.left
    top = rect.top
    height = rect.height
  }
  const getTriggerRect = () => {
    const rect = trigger.value.getBoundingClientRect()
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height
    }
  }
  const initTriggerPosition = () => {
    if (left !== 0 || top !== 0 || height !== 0) return
    setPosition(getTriggerRect())
  }
  function detectTriggerPositionChange (job) {
    const rect = getTriggerRect()
    if (left !== rect.left || top !== rect.top || height !== rect.height) {
      setPosition(rect)
      nextTick(() => job?.())
    }
  }

  onMounted(() => initTriggerPosition())

  return {
    detectTriggerPositionChange
  }
}
export function useDropdownPlacement (content, visible) {
  const placement = ref({
    horizontal: 'left',
    vertical: 'top'
  })
  let observer = null

  watch(visible, (val) => {
    if (val && content.value) {
      setupIntersectionObserver()
    } else {
      cleanupObserver()
    }
  })

  function setupIntersectionObserver () {
    if (!content.value) return

    cleanupObserver()

    const options = {
      root: null, // viewport
      threshold: 1.0 // 完全可见时才算稳定
    }

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      const { boundingClientRect, rootBounds } = entry
      if (!rootBounds) return

      const spaceBelow = rootBounds.bottom - boundingClientRect.bottom
      const spaceAbove = boundingClientRect.top - rootBounds.top

      // 如果下方空间不够，改成向上展开
      if (spaceBelow < 0 && spaceAbove > spaceBelow) {
        placement.value.vertical = 'top'
      } else {
        placement.value.vertical = 'bottom'
      }
    }, options)

    observer.observe(content.value)
  }

  function cleanupObserver () {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  return {
    observeDropdown: setupIntersectionObserver,
    disconnectObserver: cleanupObserver,
    placement
  }
}

export function useResizeObserver (elementRef, callback, options = {}) {
  const isObserving = ref(false)
  const size = ref({ width: 0, height: 0 })
  let observer = null

  const handleResize = (entries) => {
    const entry = entries[0]
    if (entry) {
      size.value = {
        width: entry.contentRect.width,
        height: entry.contentRect.height
      }
    }

    if (callback) callback(entries)
  }

  const startObserving = () => {
    if (!elementRef.value || isObserving.value) return

    if (!observer) {
      observer = new ResizeObserver(handleResize)
    }

    observer.observe(elementRef.value)
    isObserving.value = true
  }

  const stopObserving = () => {
    if (!observer || !isObserving.value) return

    if (elementRef.value) {
      observer.unobserve(elementRef.value)
    }

    isObserving.value = false
  }

  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
      isObserving.value = false
    }
  }

  onUnmounted(disconnect)

  return {
    size: readonly(size),
    startObserving,
    stopObserving
  }
}

export function useContentPosition (triggerRef, contentRef, props) {
  const verticalDirection = ref('down')
  const horizontalDirection = ref('left')
  const transitionName = ref('')
  return {
    transitionName: transitionName.value,
    left: 0,
    top: 0
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
    if (el) {
      el.removeEventListener(event, handler, options)
      el = null
    }
  }

  onMounted(() => {
    el = typeof target === 'function' ? target() : target
    el?.addEventListener(event, handler, options)
  })

  onBeforeUnmount(cleanup)

  return cleanup
}
