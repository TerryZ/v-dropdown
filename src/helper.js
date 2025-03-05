import { ref, computed, inject, nextTick, onMounted, onBeforeUnmount } from 'vue'
import ResizeObserverPolyfill from 'resize-observer-polyfill'
import { scrollInfo } from './util'
import {
  TRIGGER_CLICK,
  TRIGGER_CONTEXTMENU,
  TRIGGER_HOVER,
  ROUNDED_SMALL,
  ROUNDED_MEDIUM,
  injectDropdown,
  roundedList,
  contentRoundedList
} from './constants'

export { getElementRect } from './util'

export function useTriggerState (trigger) {
  return {
    isTriggerByClick: trigger === TRIGGER_CLICK,
    isTriggerByHover: trigger === TRIGGER_HOVER,
    isTriggerByContextmenu: trigger === TRIGGER_CONTEXTMENU
  }
}

export function useDropdownContent (options) {
  const { trigger, align, gap, animated, animationName } = options
  const verticalDirection = ref('down')
  const transitionName = computed(() => {
    if (!animated) return ''
    if (animationName) return animationName
    return `animate-${verticalDirection.value}`
  })

  /**
   * Calculation display direction and top axis
   * @param {number} x
   * @param {DOMRect} rootRect - root element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @return {number}
   */
  function getTop (y, rootRect, contentRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger.value)
    const scrollTop = window.scrollY
    const viewHeight = document.documentElement.clientHeight
    const srcTop = isTriggerByContextmenu ? y : rootRect.top + scrollTop
    const top = isTriggerByContextmenu
      ? y
      : rootRect.top + rootRect.height + gap.value + scrollTop

    const overBottom = (top + contentRect.height) > (scrollTop + viewHeight)
    const overTop = (srcTop - gap.value - contentRect.height) < scrollTop

    if (!overTop && overBottom) {
      verticalDirection.value = 'up'
      return srcTop - gap.value - contentRect.height
    }

    verticalDirection.value = 'down'
    return top
  }
  /**
   * Calculation left axis
   * @param {number} x
   * @param {DOMRect} rootRect - root element bounding client rect
   * @param {DOMRect} contentRect - content element bounding client rect
   * @returns {number}
   */
  function getLeft (x, rootRect, contentRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger.value)
    const scrollLeft = window.scrollX
    const viewWidth = document.documentElement.clientWidth
    const width = isTriggerByContextmenu ? 0 : rootRect.width
    // left axis of align left
    const left = isTriggerByContextmenu ? x : rootRect.left + scrollLeft
    // left axis of align center
    const center = (left + (width / 2)) - (contentRect.width / 2)
    // left axis of align right
    const right = (left + width) - contentRect.width

    const isLeftOutOfViewOnRight = (left + contentRect.width) > (scrollLeft + viewWidth)
    const isCenterOutOfViewOnRight = (center + contentRect.width) > (scrollLeft + viewWidth)
    const isRightOutOfViewOnLeft = right < scrollLeft

    switch (align.value) {
      case 'left': return isLeftOutOfViewOnRight ? right : left
      case 'center': return isCenterOutOfViewOnRight
        ? right
        : isRightOutOfViewOnLeft ? left : center
      case 'right': return isRightOutOfViewOnLeft ? left : right
    }
  }

  return {
    transitionName,
    getTop,
    getLeft
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

export function getTriggerClasses (props) {
  return [
    'dd-trigger',
    props.block && 'dd-trigger--block'
  ]
}
export function getRoundedClass (value) {
  const level = !value || !roundedList.includes(value)
    ? ROUNDED_MEDIUM
    : roundedList.find(val => val === value)
  return `dd-rounded--${level}`
}
export function getContentRoundedClass (value) {
  const level = !value || !contentRoundedList.includes(value)
    ? ROUNDED_SMALL
    : contentRoundedList.find(val => val === value)
  return `dd-content-rounded--${level}`
}
export function useDropdown () {
  return inject(injectDropdown, {})
}
export function useDebounce (time = 300) {
  let timer

  return callback => {
    clearTimeout(timer)
    timer = setTimeout(callback, time)
  }
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
