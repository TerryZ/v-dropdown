import './dropdown.sass'

import {
  ref,
  reactive,
  watch,
  h,
  withDirectives,
  vShow,
  Transition,
  Teleport,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  defineComponent
} from 'vue'
import {
  TRIGGER_CLICK,
  HOVER_RESPONSE_TIME,
  adjustLeft,
  adjustTop,
  getContainerClasses,
  getTriggerClasses,
  getElementRect,
  getAnimate,
  useMouseContextMenu,
  useState
} from './helper'

export default defineComponent({
  name: 'VDropdown',
  props: {
    /** Container show up alignment direction */
    align: { type: String, default: 'left' },
    border: { type: Boolean, default: true },
    /**
     * Toggle display / close dropdown container
     */
    toggle: { type: Boolean, default: true },
    /** Manual control the display and hiding of dropdown */
    manual: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    /**
     * Open / close dropdown animation
     *
     * {boolean}
     * - true: use default animation
     * - false: don't display animation
     * {string} customized animation class-name
     */
    animated: { type: [String, Boolean], default: true },
    /**
     * The width of dropdown container
     * min-width: 80
     */
    width: { type: Number, default: undefined },
    /**
     * Trigger container display type
     * - false: inline-block
     * - true: block
     */
    fullWidth: { type: Boolean, default: false },
    /**
     * Dropdown trigger method
     * - `click` default
     * - `hover`
     * - `contextmenu`
     */
    trigger: { type: String, default: TRIGGER_CLICK },
    /** Add custom class to trigger */
    customTriggerClass: { type: String, default: '' },
    /** Add custom class to container */
    customContainerClass: { type: String, default: '' }
  },
  emits: ['visible-change'],
  setup (props, { slots, emit, expose }) {
    const visible = ref(false)
    const styleSheet = reactive({ top: '', left: '', width: '' })
    const position = reactive({ x: null, y: null })
    const dropUp = ref(false)
    const timeout = ref(null)

    const root = ref(null)
    const container = ref(null)

    const {
      isTriggerByClick,
      isTriggerByHover,
      isTriggerByContextmenu
    } = useState(props)

    watch(visible, val => emit('visible-change', val))

    function display () {
      if (props.disabled) return
      /**
       * calculation display direction(up or down) and top axis
       */
      if ('trigger' in slots) adjust()

      if (isTriggerByHover) {
        window.clearTimeout(timeout.value)
        timeout.value = window.setTimeout(() => { visible.value = true }, HOVER_RESPONSE_TIME)
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
        window.clearTimeout(timeout.value)
        timeout.value = window.setTimeout(() => { visible.value = false }, HOVER_RESPONSE_TIME)
      } else {
        visible.value = false
      }
    }
    function toggleVisible () {
      visible.value ? close() : display()
    }
    // adjust dropdown display position
    function adjust () {
      const rootRect = getElementRect(root.value)
      const containerRect = getElementRect(container.value)
      const result = adjustTop(props, position.y, rootRect, containerRect)
      const left = adjustLeft(props, position.x, rootRect, containerRect)

      dropUp.value = result.dropUp
      styleSheet.top = `${result.top}px`
      styleSheet.left = `${left}px`
    }
    /**
     * handle click event outside the dropdown container
     * @param {MouseEvent} e - event object
     */
    function whole (e) {
      if (!visible.value) return

      // is the trigger element clicking
      const inTrigger = e.composedPath().some(val => val === root.value)
      // do not toggle show/close when `toggle` prop is set to false
      if (inTrigger && !props.toggle && !isTriggerByContextmenu) return
      // close the dropdown when clicking outside of the dropdown container
      // reopen the dropdown when right-click in trigger(trigger = `contextmenu`)
      if (!inTrigger || (inTrigger && isTriggerByContextmenu)) {
        close(true)
      }
    }

    onMounted(() => {
      if (typeof props.width !== 'undefined') {
        styleSheet.width = props.width + 'px'
      }
      // document.body.append(container.value)
      document.body.addEventListener('mousedown', whole)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('mousedown', whole)
      // remove dropdown container
      container.value && container.value.remove()
    })
    onUnmounted(() => { root.value && root.value.remove() })

    expose({
      display,
      close,
      toggleVisible,
      adjust,
      container,
      visible
    })

    return () => {
      const children = []
      // the dropdown trigger
      if ('trigger' in slots) {
        children.push(slots.trigger({
          visible,
          disabled: props.disabled
        }))
      }

      const containerOption = {
        class: getContainerClasses(props),
        style: styleSheet,
        ref: container,
        // do not close dropdown container when
        // do some operations in that
        onMousedown: e => e.stopPropagation()
      }
      if (isTriggerByHover) {
        containerOption.onMouseenter = display
        containerOption.onMouseleave = close
      }
      const dropdownContainer = withDirectives(
        h('div', containerOption, slots.default && slots.default()),
        [[vShow, visible.value]]
      )
      // the dropdown container
      children.push(
        h(Teleport, { to: 'body' }, [
          h(Transition, { name: getAnimate(props, dropUp) }, () => [dropdownContainer])
        ])
      )

      const dropdownOption = {
        class: getTriggerClasses(props),
        ref: root
      }

      if (isTriggerByHover) {
        dropdownOption.onMouseenter = display
        dropdownOption.onMouseleave = close
      } else if (isTriggerByClick) {
        dropdownOption.onClick = e => {
          if (props.manual) return
          e.stopPropagation()
          toggleVisible()
        }
      } else if (isTriggerByContextmenu) {
        // mouse right click to trigger dropdown
        dropdownOption.onContextmenu = e => {
          if (props.manual) return
          e.stopPropagation()
          e.preventDefault()

          const point = useMouseContextMenu(e)
          position.x = point.x
          position.y = point.y
          display()
        }
      }

      return h('div', dropdownOption, children)
    }
  }
})
