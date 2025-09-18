import './styles/dropdown.sass'

import { ref, defineComponent } from 'vue'
import { getTriggerClasses } from './helper'
import { useDropdownCore } from './core'
import { TRIGGER_CLICK, APPEND_TO_BODY } from './constants'

import DropdownTrigger from './DropdownTrigger'
import DropdownContentContainer from './DropdownContentContainer'

export default defineComponent({
  name: 'VDropdown',
  props: {
    disabled: { type: Boolean, default: false },
    /** Content show up alignment direction */
    align: { type: String, default: 'left' },
    /** Toggle display / close dropdown content */
    toggle: { type: Boolean, default: true },
    /** Manual control the display and hiding of dropdown */
    manual: { type: Boolean, default: false },
    /**
     * Trigger container display mode
     * - false: inline-flex
     * - true: flex
     */
    block: { type: Boolean, default: false },
    /**
     * Dropdown trigger method
     * - `click` default
     * - `hover`
     * - `contextmenu`
     */
    trigger: { type: String, default: TRIGGER_CLICK },
    animated: { type: Boolean, default: true },
    /** The distance(px) between the trigger and the content */
    gap: { type: Number, default: 5 },
    /** Dropdown content append target */
    appendTo: { type: [String, Object], default: APPEND_TO_BODY }
  },
  emits: ['visible-change', 'open', 'close', 'opened', 'closed'],
  setup (props, context) {
    const { slots } = context

    const triggerRef = ref(null)
    const contentRef = ref()

    const {
      slotData,
      visible,
      contentClasses,
      contentStyles
    } = useDropdownCore(triggerRef, contentRef, props, context)

    const Trigger = () => slots.trigger ? slots.trigger(slotData) : <DropdownTrigger />
    const Content = () => {
      return (
        <DropdownContentContainer>
          {() => (
            <div
              ref={contentRef}
              style={contentStyles.value}
              class={contentClasses.value}
              v-show={visible.value}
            >{slots?.default?.(slotData)}</div>
          )}
        </DropdownContentContainer>
      )
    }

    return () => (
      <div ref={triggerRef} class={getTriggerClasses(props)}>
        <Trigger />
        <Content />
      </div>
    )
  }
})
