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
    /**
     * dropdown layer embedded to page/component
     */
    embed: { type: Boolean, default: false },
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
     * container with
     * false: inline-block
     * true: block
     */
    fullWidth: { type: Boolean, default: false }
  },
  emits: ['visible-change'],
  setup (props, { slots, emit, expose }) {
    const show = ref(false)
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
      if (!props.embed && props.animated) {
        return dropUp.value ? 'animate-up' : 'animate-down'
      }
      return ''
    })

    function visible (outside = false) {
      if (props.disabled) return
      /**
       * do not toggle show/close when 'toggle' option is set to false
       */
      if (show.value && !props.toggle && !outside) return
      /**
       * calculation display direction(up or down) and top axis
       */
      if (!show.value && !props.embed && 'trigger' in slots) adjust()

      show.value = !show.value
      emit('visible-change', show.value)
    }
    /**
     * adjust dropdown display position
     */
    function adjust () {
      const rootRect = root.value.getBoundingClientRect()
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
      if (!show.value) return

      // is trigger element click
      const inTrigger = e.composedPath().some(val => val === root.value)
      // do not toggle show/close when 'toggle' option is set to false
      if (inTrigger && !props.toggle && !props.rightClick) return
      // close the dropdown when clicking outside the dropdown container
      // reopen the dropdown when right-click in trigger(rightClick = true)
      if (!inTrigger || (inTrigger && props.rightClick)) {
        visible(true)
      }
    }

    onMounted(() => {
      if (props.width) {
        styleSheet.width = props.width + 'px'
      }
      if (props.embed) {
        visible()
      } else {
        document.body.appendChild(container.value)
        document.body.addEventListener('mousedown', whole)
      }
    })
    onBeforeUnmount(() => {
      // remove drop down layer
      if (props.embed) {
        return
      }
      document.body.removeEventListener('mousedown', whole)
      container.value.remove()
    })
    onUnmounted(() => {
      if (props.embed) {
        return
      }
      root.value && root.value.remove()
    })

    expose({
      visible,
      adjust
    })

    return () => {
      const children = []
      // the dropdown trigger
      if ('trigger' in slots && !props.embed) {
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
        [[vShow, show.value]]
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
          if (props.embed || props.rightClick || props.manual) {
            return
          }
          e.stopPropagation()
          visible()
        },
        // mouse right button click
        onContextmenu: e => {
          if (props.embed || props.manual || !props.rightClick) {
            return
          }
          e.stopPropagation()
          e.preventDefault()

          const point = useMouseContextMenu(e)
          x.value = point.x
          y.value = point.y
          visible()
        }
      }
      return h('div', dropdownOption, children)
    }
  }
}
