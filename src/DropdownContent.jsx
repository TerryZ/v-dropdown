import { inject, Transition, Teleport } from 'vue'
import { injectInternal, injectDropdown } from './constants'

export default {
  name: 'DropdownContent',
  inheritAttrs: false,
  props: {
  },
  setup (props, { slots, attrs }) {
    const {
      slotData
    } = inject(injectInternal)
    return (
      <Teleport to='body'>
        <Transition

        >
          {() => (
            <div

              {...attrs}
            >{slots?.default?.(slotData)}</div>
          )}
        </Transition>
      </Teleport>
    )
  }
}
