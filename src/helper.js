import { ref, computed, inject } from 'vue'
import { scrollInfo } from './util'
import {
  TRIGGER_CLICK,
  TRIGGER_CONTEXTMENU,
  TRIGGER_HOVER,
  GAP,
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

export function useDropdownContainer (trigger, align) {
  const verticalDirection = ref('down')
  const animationName = computed(() => {
    return `animate-${verticalDirection.value}`
  })

  /**
   * Calculation display direction and top axis
   * @param {object} props
   * @param {number} x
   * @param {DOMRect} rootRect - root element bounding client rect
   * @param {DOMRect} containerRect - container element bounding client rect
   * @return {{ dropUp: boolean, top: number }}
   */
  function getTop (y, rootRect, containerRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger)
    const scrollTop = window.scrollY
    const viewHeight = document.documentElement.clientHeight
    const srcTop = isTriggerByContextmenu ? y : rootRect.top + scrollTop
    let t = isTriggerByContextmenu ? y : rootRect.top + rootRect.height + GAP + scrollTop
    let overDown = false
    let overUp = false
    verticalDirection.value = 'down'
    // dropdown container over viewport
    if ((t + containerRect.height) > (scrollTop + viewHeight)) {
      overDown = true
    }
    if ((srcTop - GAP - containerRect.height) < scrollTop) {
      overUp = true
    }

    if (!overUp && overDown) {
      console.log(containerRect.height)
      t = srcTop - GAP - containerRect.height
      verticalDirection.value = 'up'
    }

    return t
  }
  /**
   * Calculation left axis
   * @param {object} props
   * @param {number} x
   * @param {DOMRect} rootRect - root element bounding client rect
   * @param {DOMRect} containerRect - container element bounding client rect
   * @returns {number}
   */
  function getLeft (x, rootRect, containerRect) {
    const { isTriggerByContextmenu } = useTriggerState(trigger)
    const scrollLeft = window.scrollX
    const viewWidth = document.documentElement.clientWidth
    const width = isTriggerByContextmenu ? 0 : rootRect.width
    // align left's left
    const left = isTriggerByContextmenu ? x : rootRect.left + scrollLeft
    // align center's left
    const center = (left + (width / 2)) - (containerRect.width / 2)
    // align right's left
    const right = (left + width) - containerRect.width

    switch (align) {
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
    animationName,
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
  const resizeObserver = new ResizeObserver((entries) => {
    const rect = entries[0].contentRect
    if (!rect.width && !rect.height) return
    job?.()
  })
  return {
    containerSizeObserve: () => resizeObserver.observe(container.value),
    containerSizeUnobserve: () => resizeObserver.unobserve(container.value)
  }
}
