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
  scrollInfo,
  adjustLeft,
  adjustTop
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
     * mouse right click caller area to display dropdown
     */
    rightClick: { type: Boolean, default: false },
    /**
     * click caller and display dropdown, the
     * caller click again whether to close dropdown
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
  emits: ['show'],
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
      if (!show.value && !props.embed && 'caller' in slots) adjust()

      show.value = !show.value
      emit('show', show.value)
    }
    /**
     * the dropdown container outside click handle
     * @param {MouseEvent} e - event object
     */
    function whole (e) {
      if (!show.value) return

      // is caller element click
      const inCaller = e.composedPath().findIndex(val => val === root.value) !== -1
      // do not toggle show/close when 'toggle' option is set to false
      if (inCaller && !props.toggle && !props.rightClick) return
      // close the dropdown when clicking outside the dropdown container
      // reopen the dropdown when right-click in caller(rightClick = true)
      if (!inCaller || (inCaller && props.rightClick)) {
        visible(true)
      }
    }
    /**
     * adjust dropdown display position
     */
    function adjust () {
      const rootRect = root.value.getBoundingClientRect()
      let containerRect = null

      if (show.value) {
        containerRect = container.value.getBoundingClientRect()
      } else {
        /**
         * change the way to hide dropdown container from
         * 'display:none' to 'visibility:hidden'
         * be used for get width and height
         */
        container.value.style.visibility = 'hidden'
        container.value.style.display = 'inline-block'
        containerRect = container.value.getBoundingClientRect()
        /**
         * restore dropdown style after getting position data
         */
        container.value.style.visibility = 'visible'
        container.value.style.display = 'none'
      }

      const result = adjustTop(props, y.value, rootRect, containerRect)
      dropUp.value = result.dropUp
      styleSheet.top = `${result.top}px`
      styleSheet.left = `${adjustLeft(props, x.value, rootRect, containerRect)}px`
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
      if (!props.embed) {
        document.body.removeEventListener('mousedown', whole)
        container.value.remove()
      }
    })
    onUnmounted(() => {
      if (!props.embed) {
        root.value && root.value.remove()
      }
    })

    expose({
      visible,
      adjust
    })

    return () => {
      const children = []
      // the dropdown layer caller
      if ('caller' in slots && !props.embed) {
        children.push(slots.caller())
      }
      const containerOption = {
        class: {
          'v-dropdown-container': true,
          'v-dropdown-embed': props.embed,
          'v-dropdown-no-border': !props.border
        },
        style: styleSheet,
        ref: container,
        onMousedown: e => {
          // do not close dropdown container layer when
          // do some operations in that
          e.stopPropagation()
        }
      }
      const dropdownContainer = withDirectives(
        h('div', containerOption, slots.default()),
        [[vShow, show.value]]
      )
      // the dropdown layer container
      children.push(
        h(Transition, { name: animate.value }, () => [dropdownContainer])
      )

      return h('div', {
        class: {
          'v-dropdown-caller': true,
          'v-dropdown-caller--full-width': props.fullWidth
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

          const info = scrollInfo()
          x.value = e.pageX || (e.clientX + info.x)
          y.value = e.pageY || (e.clientY + info.y)
          visible()
        }
      }, children)
    }
  }
}
