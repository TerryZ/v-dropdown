import './styles/dropdown.sass'

import {
  ref,
  watch,
  provide,
  toRef,
  toRefs,
  onMounted,
  onBeforeUnmount,
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
  injectInternal
} from './constants'

export default defineComponent({
  name: 'VDropdown',
  props: {
    disabled: { type: Boolean, default: false },
    /** Container show up alignment direction */
    align: { type: String, default: 'left' },
    /** Toggle display / close dropdown container */
    toggle: { type: Boolean, default: true },
    /** Manual control the display and hiding of dropdown */
    manual: { type: Boolean, default: false },
    /**
     * Trigger container display mode
     * - false: inline
     * - true: block
     */
    block: { type: Boolean, default: false },
    /**
     * Dropdown trigger method
     * - `click` default
     * - `hover`
     * - `contextmenu`
     */
    trigger: { type: String, default: TRIGGER_CLICK },
    /** The distance(px) between the trigger and the container */
    gap: { type: Number, default: 5 }
  },
  emits: ['visible-change', 'open', 'close', 'opened', 'closed'],
  setup (props, { slots, emit, expose }) {
    const root = ref(null)
    const visible = ref(false)
    const position = ref({ x: null, y: null })
    const adjustContentPosition = ref()

    const hoverDebounce = useDebounce(HOVER_RESPONSE_TIME)

    const {
      isTriggerByClick,
      isTriggerByHover,
      isTriggerByContextmenu
    } = useTriggerState(props.trigger)

    watch(visible, val => emit('visible-change', val))

    function display () {
      if (props.disabled) return

      adjustContentPosition.value?.()

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
    const toggleVisible = () => visible.value ? close() : display()
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
      position.value.x = point.x
      position.value.y = point.y
      display()
    }
    const registerAdjustContent = fn => {
      if (typeof fn !== 'function') return
      adjustContentPosition.value = fn
    }

    const slotData = {
      disabled: toRef(props, 'disabled', false),
      visible,
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

    provide(injectDropdown, slotData)
    provide(injectInternal, {
      position,
      display,
      close,
      registerAdjustContent,
      getRootRect: () => getElementRect(root.value),
      dropdownProps: toRefs(props),
      dropdownEmit: emit
    })

    expose({
      display,
      close,
      toggleVisible,
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
