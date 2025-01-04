import './styles/trigger.sass'

import { computed } from 'vue'

import { ROUNDED_MEDIUM } from './constants'
import { useDropdown } from './helper'

export default {
  name: 'DropdownTrigger',
  props: {
    rounded: { type: String, default: ROUNDED_MEDIUM }
  },
  setup (props, { slots }) {
    const dropdown = useDropdown()

    const buttonClasses = computed(() => ([
      {
        'dd-default-trigger': true,
        'dd-opened': dropdown?.visible?.value
      }
    ]))
    const containerClasses = computed(() => ({
      'dd-trigger-container': true,
      'dd-disabled': dropdown?.disabled?.value
    }))

    const ButtonText = () => (
      slots.default ? slots.default() : 'Open'
    )
    const ButtonIcon = () => (
      slots.append ? slots.append() : <span class='dd-caret-down' />
    )
    const TriggerButton = () => (
      <button
        type='button'
        class={buttonClasses.value}
      >
        <ButtonText />
        <ButtonIcon />
      </button>
    )

    return () => (
      <div class={containerClasses.value}>
        <TriggerButton />
      </div>
    )
  }
}
