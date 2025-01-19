import './styles/dropdown.sass'

import {
  ref,
  reactive,
  watch,
  provide,
  toRef,
  toRefs,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  defineComponent
} from 'vue'
import {
  getTriggerClasses,
  getElementRect,
  useMouseContextMenu,
  useTriggerState,
  useDebounce
} from './helper'
import {
  TRIGGER_CLICK,
  HOVER_RESPONSE_TIME,
  injectDropdown,
  injectInternal,
  ROUNDED_SMALL
} from './constants'

export default defineComponent({
  name: 'VDropdown',
  props: {
    /** Container show up alignment direction */
    align: { type: String, default: 'left' },
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
    containerRounded: { type: String, default: ROUNDED_SMALL },
    containerZIndex: { type: Number, default: 3000 },
    /** Add custom class to trigger */
    customTriggerClass: { type: String, default: '' },
    /** Add custom class to container */
    customContainerClass: { type: String, default: '' },
    gap: { type: [String, Number], default: '5px' }
  },
  emits: ['visible-change', 'open', 'close', 'opened', 'closed'],
  setup (props, { slots, emit, expose }) {
    const visible = ref(false)
    const position = reactive({ x: null, y: null })

    const root = ref(null)
    const container = ref(null)

    const hoverDebounce = useDebounce(HOVER_RESPONSE_TIME)

    const {
      isTriggerByClick,
      isTriggerByHover,
      isTriggerByContextmenu
    } = useTriggerState(props.trigger)

    watch(visible, val => emit('visible-change', val))

    function display () {
      if (props.disabled) return

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
    function toggleVisible () {
      visible.value ? close() : display()
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
    const handleTriggerClick = e => {
      if (!isTriggerByClick || props.manual) return
      e.stopPropagation()
      toggleVisible()
    }
    const handleTriggerMouseEnter = () => isTriggerByHover && display()
    const handleTriggerMouseLeave = () => isTriggerByHover && close()
    const handleTriggerContextMenu = e => {
      if (!isTriggerByContextmenu || props.manual) return
      e.stopPropagation()
      e.preventDefault()

      const point = useMouseContextMenu(e)
      position.x = point.x
      position.y = point.y
      display()
    }

    const slotData = {
      visible,
      disabled: toRef(props, 'disabled', false),
      close
    }

    function Trigger () {
      if (!slots.trigger) return null
      return slots.trigger(slotData)
    }

    onMounted(() => {
      document.body.addEventListener('mousedown', whole)
    })
    onBeforeUnmount(() => {
      document.body.removeEventListener('mousedown', whole)
    })
    onUnmounted(() => {
      root?.value?.remove?.()
    })

    provide(injectDropdown, {
      visible,
      disabled: toRef(props, 'disabled')
    })
    provide(injectInternal, {
      slotData,
      position,
      display,
      close,
      getRootRect: () => getElementRect(root.value),
      dropdownProps: toRefs(props),
      dropdownEmit: emit
    })

    expose({
      display,
      close,
      toggleVisible,
      container,
      visible
    })

    return () => (
      <div
        ref={root}
        class={getTriggerClasses(props)}
        onMouseenter={handleTriggerMouseEnter}
        onMouseleave={handleTriggerMouseLeave}
        onContextmenu={handleTriggerContextMenu}
        onClick={handleTriggerClick}
      >
        <Trigger />
        {slots.default?.(slotData)}
      </div>
    )
  }
})
