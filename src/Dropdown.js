import './dropdown.sass'

import {
  ref,
  reactive,
  computed,
  h,
  withDirectives,
  vShow,
  Transition,
  onMounted,
  onBeforeUnmount,
  onUnmounted
} from 'vue'
import {
  adjustLeft,
  adjustTop,
  getContainerClasses,
  getElementRect,
  useMouseContextMenu
} from './helper'

export default {
  name: 'v-dropdown',
  props: {
    /** align direction */
    align: { type: String, default: 'left' },
    border: { type: Boolean, default: true },
    /**
     * mouse right click trigger area to display dropdown
     */
    rightClick: { type: Boolean, default: false },
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
    fullWidth: { type: Boolean, default: false }
  },
  emits: ['visible-change'],
  setup (props, { slots, emit, expose }) {
    const visible = ref(false)
    const styleSheet = reactive({ top: '', left: '' })
    const dropUp = ref(false)
    const x = ref(null)
    const y = ref(null)

    const root = ref(null)
    const container = ref(null)

    const animate = computed(() => {
      if (typeof props.animated === 'string') {
        return props.animated
      }
      if (props.animated) {
        return dropUp.value ? 'animate-up' : 'animate-down'
      }
      return ''
    })

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

      visible.value = !visible.value
      emit('visible-change', visible.value)
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
      if (inTrigger && !props.toggle && !props.rightClick) return
      // close the dropdown when clicking outside the dropdown container
      // reopen the dropdown when right-click in trigger(rightClick = true)
      if (!inTrigger || (inTrigger && props.rightClick)) {
        display(true)
      }
    }

    onMounted(() => {
      if (props.width) {
        styleSheet.width = props.width + 'px'
      }
      document.body.appendChild(container.value)
      document.body.addEventListener('mousedown', whole)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('mousedown', whole)
      container.value.remove() // remove dropdown container
    })
    onUnmounted(() => {
      root.value && root.value.remove()
    })

    expose({
      display,
      adjust
    })

    return () => {
      const children = []
      // the dropdown trigger
      if ('trigger' in slots) {
        children.push(slots.trigger())
      }
      const containerOption = {
        class: getContainerClasses(props),
        style: styleSheet,
        ref: container,
        // do not close dropdown container layer when
        // do some operations in that
        onMousedown: e => e.stopPropagation()
      }
      const dropdownContainer = withDirectives(
        h('div', containerOption, slots.default()),
        [[vShow, visible.value]]
      )
      // the dropdown layer container
      children.push(
        h(Transition, { name: animate.value }, () => [dropdownContainer])
      )

      const dropdownOption = {
        class: {
          'v-dropdown-trigger': true,
          'v-dropdown-trigger--full-width': props.fullWidth
        },
        ref: root,
        onClick: e => {
          if (props.rightClick || props.manual) {
            return
          }
          e.stopPropagation()
          display()
        },
        // mouse right button click trigger area
        onContextmenu: e => {
          if (props.manual || !props.rightClick) {
            return
          }
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
