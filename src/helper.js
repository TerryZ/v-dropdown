import { ref, computed, inject } from 'vue'
import { scrollInfo } from './util'
import {
  TRIGGER_CLICK,
  TRIGGER_CONTEXTMENU,
  TRIGGER_HOVER,
  ROUNDED_SMALL,
  ROUNDED_PILL,
  injectDropdown,
  roundedList,
  containerRoundedList
} from './constants'

export { getElementRect } from './util'

export function getAnimate (props, dropUp) {
  if (typeof props.animated === 'string') {
    return props.animated
  }
  if (!props.animated) return ''
  return dropUp.value ? 'animate-up' : 'animate-down'
}

export function useTriggerState (trigger) {
  return {
    isTriggerByClick: trigger === TRIGGER_CLICK,
    isTriggerByHover: trigger === TRIGGER_HOVER,
    isTriggerByContextmenu: trigger === TRIGGER_CONTEXTMENU
  }
}

export function useDropdownContainer (options) {
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
   * @param {DOMRect} containerRect - container element bounding client rect
   * @return {number}
   */
  function getTop (y, rootRect, containerRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger.value)
    const scrollTop = window.scrollY
    const viewHeight = document.documentElement.clientHeight
    const srcTop = isTriggerByContextmenu ? y : rootRect.top + scrollTop
    const top = isTriggerByContextmenu
      ? y
      : rootRect.top + rootRect.height + gap.value + scrollTop
    let overDown = false
    let overUp = false
    // dropdown container over viewport
    if ((top + containerRect.height) > (scrollTop + viewHeight)) {
      overDown = true
    }
    if ((srcTop - gap.value - containerRect.height) < scrollTop) {
      overUp = true
    }

    if (!overUp && overDown) {
      verticalDirection.value = 'up'
      return srcTop - gap.value - containerRect.height
    }

    verticalDirection.value = 'down'
    return top
  }
  /**
   * Calculation left axis
   * @param {number} x
   * @param {DOMRect} rootRect - root element bounding client rect
   * @param {DOMRect} containerRect - container element bounding client rect
   * @returns {number}
   */
  function getLeft (x, rootRect, containerRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger.value)
    const scrollLeft = window.scrollX
    const viewWidth = document.documentElement.clientWidth
    const width = isTriggerByContextmenu ? 0 : rootRect.width
    // left axis of align left
    const left = isTriggerByContextmenu ? x : rootRect.left + scrollLeft
    // left axis of align center
    const center = (left + (width / 2)) - (containerRect.width / 2)
    // left axis of align right
    const right = (left + width) - containerRect.width

    switch (align.value) {
      case 'left':
        return (left + containerRect.width) > (scrollLeft + viewWidth) ? right : left
      case 'center':
        if ((center + containerRect.width) > (scrollLeft + viewWidth)) {
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

export function getContainerClasses (props) {
  return [
    'dd-container',
    props.border || 'dd-no-border',
    getContainerRoundedClass(props.containerRounded)
  ]
}

export function getTriggerClasses (props) {
  return [
    'dd-trigger',
    props.fullWidth && 'dd-trigger--full-width',
    props.customTriggerClass && props.customTriggerClass
  ]
}
export function getRoundedClass (value) {
  const level = !value || !roundedList.includes(value)
    ? ROUNDED_PILL
    : roundedList.find(val => val === value)
  return `dd-rounded--${level}`
}
export function getContainerRoundedClass (value) {
  const level = !value || !containerRoundedList.includes(value)
    ? ROUNDED_SMALL
    : containerRoundedList.find(val => val === value)
  return `dd-container-rounded--${level}`
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
export function useContainerSizeChangeHandle (container, job) {
  let width = 0
  let height = 0
  const setSize = rect => {
    width = rect.width
    height = rect.height
  }
  const resizeObserver = new ResizeObserver((entries) => {
    const rect = entries[0].contentRect
    // console.log(rect)
    // container invisible
    if (!rect.width && !rect.height) return
    // storage container size when first time open
    if (width === 0 && height === 0) {
      return setSize(rect)
    }
    // container size changed
    if (width !== rect.width || height !== rect.height) {
      setSize(rect)
      job?.()
    }
  })
  return {
    containerSizeObserve: () => resizeObserver.observe(container.value),
    containerSizeUnobserve: () => resizeObserver.unobserve(container.value)
  }
}
