import { ref, watch, provide, computed, toRefs } from 'vue'

import {
  useDebounce,
  useDropdownContentDirection,
  useEventListener,
  useResizeObserver,
  useIntersectionObserver
} from './use'
import { getTriggerState } from './helper'
import {
  HOVER_RESPONSE_TIME,
  APPEND_TO_BODY,
  DIRECTION_RIGHT, DIRECTION_DOWN,
  keyContainer, keyDropdown, keyInternal
} from './constants'

export function useDropdownCore (
  triggerRef,
  contentRef,
  props,
  context
) {
  const { emit, expose } = context
  const { disabled, manual, toggle } = toRefs(props)

  const visible = ref(false)
  const position = ref({ x: null, y: null })
  const direction = ref({ vertical: DIRECTION_DOWN, horizontal: DIRECTION_RIGHT })
  const getContentClass = ref()
  const contentStyles = ref({})
  const transitionName = computed(() => {
    if (!props.animated) return ''
    return `drop-${direction.value.vertical}-${direction.value.horizontal}`
  })

  const appendTo = props.appendTo || APPEND_TO_BODY
  const defer = props.appendTo !== APPEND_TO_BODY

  const hoverDebounce = useDebounce(HOVER_RESPONSE_TIME)
  const {
    isTriggerByClick, isTriggerByHover, isTriggerByContextmenu
  } = getTriggerState(props.trigger)
  const {
    getDirection
  } = useDropdownContentDirection(triggerRef, contentRef, position, direction, visible, props)
  const {
    startObserving, stopObserving
  } = useResizeObserver(triggerRef, contentRef, adjustContentPosition)
  const {
    startIntersectionObserving, stopIntersectionObserving
  } = useIntersectionObserver(contentRef, adjustContentPosition)

  watch(visible, val => {
    emit('visible-change', val)

    if (val) {
      document.body.addEventListener('mousedown', outsideClick)
      startObserving()
      startIntersectionObserving()
    } else {
      stopObserving()
      stopIntersectionObserving()
      document.body.removeEventListener('mousedown', outsideClick)
    }
  })

  function onDropdownOpen () {
    emit('open')
  }
  function onDropdownOpened () {
    emit('opened')
  }
  function onDropdownClose () {
    emit('close')
  }
  function onDropdownClosed () {
    emit('closed')
  }
  function open () {
    if (disabled.value) return

    adjustContentPosition()

    if (isTriggerByHover) {
      hoverDebounce(() => { visible.value = true })
    } else {
      visible.value = true
    }
  }
  function close () {
    if (disabled.value && !visible.value) return

    if (isTriggerByHover) {
      hoverDebounce(() => { visible.value = false })
    } else {
      visible.value = false
    }
  }
  const toggleVisible = () => {
    if (toggle.value) {
      return visible.value ? close() : open()
    }

    if (visible.value) return
    open()
  }

  /**
   * Handle click event outside the dropdown content
   * @param {MouseEvent} e - event object
   */
  function outsideClick (e) {
    if (!visible.value) return
    if (!triggerRef.value || !contentRef.value) return

    const inTrigger = triggerRef.value.contains(e.target)
    const inContent = contentRef.value.contains(e.target)

    if (inTrigger) {
      return isTriggerByContextmenu && e.button === 0 ? close() : ''
    }

    if (!inContent) close()
  }
  function adjustContentPosition () {
    const result = getDirection()
    contentStyles.value.top = `${result.top}px`
    contentStyles.value.left = `${result.left}px`
  }
  const handleTriggerClick = e => {
    if (!isTriggerByClick || manual.value) return
    e.stopPropagation()
    toggleVisible()
  }
  const handleHoverEnter = () => isTriggerByHover && open()
  const handleHoverLeave = () => isTriggerByHover && close()
  const handleTriggerContextMenu = e => {
    if (!isTriggerByContextmenu || manual.value) return
    e.stopPropagation()
    e.preventDefault()

    position.value.x = e.pageX
    position.value.y = e.pageY
    open()
  }

  if (isTriggerByClick) {
    useEventListener(() => triggerRef.value, 'click', handleTriggerClick)
  }
  if (isTriggerByHover) {
    useEventListener(() => triggerRef.value, 'mouseenter', handleHoverEnter)
    useEventListener(() => triggerRef.value, 'mouseleave', handleHoverLeave)
    useEventListener(() => contentRef.value, 'mouseenter', handleHoverEnter)
    useEventListener(() => contentRef.value, 'mouseleave', handleHoverLeave)
  }
  if (isTriggerByContextmenu) {
    useEventListener(() => triggerRef.value, 'contextmenu', handleTriggerContextMenu)
  }

  const slotData = {
    disabled: computed(() => disabled.value),
    visible: computed(() => visible.value),
    adjust: adjustContentPosition,
    open,
    close,
    toggleVisible
  }

  provide(keyDropdown, slotData)
  provide(keyInternal, {
    contentStyles,
    setContentClassGetter: fn => { getContentClass.value = fn }
  })
  provide(keyContainer, {
    appendTo,
    defer,
    transitionName,
    onDropdownOpen,
    onDropdownOpened,
    onDropdownClose,
    onDropdownClosed
  })

  expose({
    open,
    close,
    toggleVisible,
    adjust: adjustContentPosition,
    visible
  })

  return {
    visible,
    open,
    close,
    toggleVisible,
    slotData,
    getContentClass,
    contentStyles
  }
}
