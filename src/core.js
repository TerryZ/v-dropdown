import { ref, watch, provide, computed } from 'vue'

import { useDebounce, useDropdownContentDirection, useEventListener } from './use'
import { getTriggerState } from './helper'
import {
  HOVER_RESPONSE_TIME,
  APPEND_TO_BODY,
  keyContainer, keyDropdown, keyInternal
} from './constants'

export function useDropdownCore (
  triggerRef,
  contentRef,
  props,
  context
) {
  const { emit, expose } = context
  const visible = ref(false)
  const position = ref({ x: null, y: null })
  const contentClasses = ref([])
  const contentStyles = ref({})
  const transitionName = ref('')

  const appendTo = props.appendTo || APPEND_TO_BODY
  const defer = props.appendTo !== APPEND_TO_BODY

  const hoverDebounce = useDebounce(HOVER_RESPONSE_TIME)
  const {
    isTriggerByClick,
    isTriggerByHover,
    isTriggerByContextmenu
  } = getTriggerState(props.trigger)
  const { getDirection } = useDropdownContentDirection(triggerRef, contentRef, position, props)

  watch(visible, val => {
    emit('visible-change', val)

    if (val) {
      document.addEventListener('mousedown', outsideClick)
    } else {
      document.removeEventListener('mousedown', outsideClick)
    }
  })

  function open () {
    if (props.disabled) return

    adjustContentPosition()

    if (isTriggerByHover) {
      hoverDebounce(() => { visible.value = true })
    } else {
      visible.value = true
    }
  }
  function close (outside = false) {
    if (props.disabled) return
    /**
     * do not toggle show/close when 'toggle' option is set to false
     */
    if (!props.toggle && !outside) return

    if (isTriggerByHover) {
      hoverDebounce(() => { visible.value = false })
    } else {
      visible.value = false
    }
  }
  const toggleVisible = () => visible.value ? close() : open()

  /**
   * handle click event outside the dropdown content
   * @param {MouseEvent} e - event object
   */
  // TODO: 评估是否需要重构
  function outsideClick (e) {
    if (!visible.value) return

    // is the trigger element clicking
    const inTrigger = e.composedPath().some(val => val === triggerRef.value)
    // do not toggle show/close when `toggle` prop is set to false
    if (inTrigger && !props.toggle && !isTriggerByContextmenu) return
    // close the dropdown when clicking outside of the dropdown content
    // reopen the dropdown when right-click in trigger(trigger = `contextmenu`)
    if (!inTrigger || (inTrigger && isTriggerByContextmenu)) {
      close(true)
    }
  }
  function adjustContentPosition () {
    const result = getDirection()
    transitionName.value = result.transitionName
    contentStyles.value.top = `${result.top}px`
    contentStyles.value.left = `${result.left}px`
  }
  const handleContentClick = e => {
    if (!visible.value) return
    e.stopPropagation()
    // detectTriggerPositionChange(adjust)
  }
  const handleTriggerClick = e => {
    if (!isTriggerByClick || props.manual) return
    e.stopPropagation()
    toggleVisible()
  }
  const handleHoverEnter = () => isTriggerByHover && open()
  const handleHoverLeave = () => isTriggerByHover && close()
  const handleTriggerContextMenu = e => {
    if (!isTriggerByContextmenu || props.manual) return
    e.stopPropagation()
    e.preventDefault()

    position.value.x = e.pageX
    position.value.y = e.pageY
    open()
  }

  useEventListener(() => contentRef.value, 'click', handleContentClick)
  useEventListener(() => contentRef.value, 'mousedown', e => e.stopPropagation())

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
    disabled: computed(() => props.disabled),
    visible: computed(() => visible.value),
    adjust: adjustContentPosition,
    close
  }

  provide(keyDropdown, slotData)
  provide(keyInternal, {
    contentClasses,
    contentStyles
    // detectTriggerPositionChange
  })
  provide(keyContainer, {
    appendTo,
    defer,
    transitionName,
    dropdownEmit: emit
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
    contentClasses,
    contentStyles
  }
}
