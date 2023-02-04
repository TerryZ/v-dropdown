import './dropdown.sass'

import {
  ref,
  reactive,
  watch,
  h,
  withDirectives,
  vShow,
  Transition,
  onMounted,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
import {
  TRIGGER_CLICK,
  HOVER_RESPONSE_TIME,
  adjustLeft,
  adjustTop,
  getContainerClasses,
  getElementRect,
  getAnimate,
  useMouseContextMenu,
  useState
} from './helper'

export default {
  name: 'v-dropdown',
  props: {
    /** align direction */
    align: { type: String, default: 'left' },
    border: { type: Boolean, default: true },
    /**
     * click trigger and display dropdown, and
     * click again whether to close dropdown
     */
    toggle: { type: Boolean, default: true },
    /** manual show / close the dropdown */
    manual: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    /**
     * open / close dropdown animation
     *
     * {boolean}
     *   - true: use default animation
     *   - false: don't show animation
     * {string} customized animation
     */
    animated: { type: [String, Boolean], default: true },
    /**
     * the width of drop down menu
     * min-width: 80
     */
    width: Number,
    /**
     * container width
     * - false: inline-block
     * - true: block
     */
    fullWidth: { type: Boolean, default: false },
    /**
     * dropdown trigger method
     * - `click` default
     * - `hover`
     * - `contextmenu`
     */
    trigger: { type: String, default: TRIGGER_CLICK }
  },
  emits: ['visible-change'],
  setup (props, { slots, emit, expose }) {
    const visible = ref(false)
    const styleSheet = reactive({ top: '', left: '', width: '' })
    const dropUp = ref(false)
    const x = ref(null)
    const y = ref(null)
    const enterTrigger = ref(false)
    const enterContainer = ref(false)
    const timeout = ref(undefined)

    const root = ref(null)
    const container = ref(null)

    const {
      isTriggerByClick,
      isTriggerByHover,
      isTriggerByContextmenu
    } = useState(props)

    watch(visible, val => emit('visible-change', val))

    function display (outside = false) {
      if (props.disabled) return
      /**
       * do not toggle show/close when 'toggle' option is set to false
       */
      if (visible.value && !props.toggle && !outside) return
      /**
       * calculation display direction(up or down) and top axis
       */
      if (!visible.value && 'trigger' in slots) adjust()

      window.clearTimeout(timeout.value)
      timeout.value = window.setTimeout(() => {
        if (visible.value) {
          if (enterTrigger.value || enterContainer.value) return
          visible.value = false
        } else {
          visible.value = true
        }
        // visible.value = !visible.value
      }, isTriggerByHover ? HOVER_RESPONSE_TIME : 0)
      // if (isTriggerByHover) {
      //   window.clearTimeout(timeout.value)
      //   timeout.value = window.setTimeout(() => {
      //     if (visible.value) {
      //       if (enterTrigger.value || enterContainer.value) return
      //       visible.value = false
      //     } else {
      //       visible.value = true
      //     }
      //     // visible.value = !visible.value
      //   }, HOVER_RESPONSE_TIME)
      // } else {
      //   visible.value = !visible.value
      // }
    }
    /**
     * adjust dropdown display position
     */
    function adjust () {
      const rootRect = getElementRect(root.value)
      const containerRect = getElementRect(container.value)
      const result = adjustTop(props, y.value, rootRect, containerRect)
      const left = adjustLeft(props, x.value, rootRect, containerRect)

      dropUp.value = result.dropUp
      styleSheet.top = `${result.top}px`
      styleSheet.left = `${left}px`
    }
    /**
     * the dropdown container outside click handle
     * @param {MouseEvent} e - event object
     */
    function whole (e) {
      if (!visible.value) return

      // is trigger element click
      const inTrigger = e.composedPath().some(val => val === root.value)
      // do not toggle show/close when 'toggle' option is set to false
      if (inTrigger && !props.toggle && !isTriggerByContextmenu) return
      // close the dropdown when clicking outside of the dropdown container
      // reopen the dropdown when right-click in trigger(rightClick = true)
      if (!inTrigger || (inTrigger && isTriggerByContextmenu)) {
        display(true)
      }
    }

    onMounted(() => {
      if (typeof props.width !== 'undefined') {
        styleSheet.width = props.width + 'px'
      }
      document.body.appendChild(container.value)
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
      adjust
    })

    return () => {
      const children = []
      // the dropdown trigger
      if ('trigger' in slots) {
        children.push(slots.trigger({
          visible: visible.value,
          disabled: props.disabled
        }))
      }

      const containerOption = {
        class: getContainerClasses(props),
        style: styleSheet,
        ref: container,
        // do not close dropdown container layer when
        // do some operations in that
        onMousedown: e => e.stopPropagation()
      }
      if (isTriggerByHover) {
        containerOption.onMouseenter = e => {
          e.stopPropagation()
          enterContainer.value = true
          display()
        }
        containerOption.onMouseleave = e => {
          e.stopPropagation()
          enterContainer.value = false
          display()
        }
      }
      const dropdownContainer = withDirectives(
        h('div', containerOption, slots.default()),
        [[vShow, visible.value]]
      )
      // the dropdown layer container
      children.push(
        h(Transition, { name: getAnimate(props, dropUp) }, () => [dropdownContainer])
      )

      const dropdownOption = {
        class: {
          'v-dropdown-trigger': true,
          'v-dropdown-trigger--full-width': props.fullWidth
        },
        ref: root
      }

      if (isTriggerByHover) {
        dropdownOption.onMouseenter = e => {
          e.stopPropagation()
          enterTrigger.value = true
          display()
        }
        dropdownOption.onMouseleave = e => {
          e.stopPropagation()
          enterTrigger.value = false
          display()
        }
      } else if (isTriggerByClick) {
        dropdownOption.onClick = e => {
          if (props.manual) return
          e.stopPropagation()
          display()
        }
      } else if (isTriggerByContextmenu) {
        // mouse right click to trigger dropdown
        dropdownOption.onContextmenu = e => {
          if (props.manual) return
          e.stopPropagation()
          e.preventDefault()

          const point = useMouseContextMenu(e)
          x.value = point.x
          y.value = point.y
          display()
        }
      }

      return h('div', dropdownOption, children)
    }
  }
}
