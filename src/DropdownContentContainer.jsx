import { defineComponent, Teleport, Transition, inject } from 'vue'

import { keyContainer } from './constants'

export default defineComponent({
  name: 'DropdownContentContainer',
  setup (props, { slots }) {
    const {
      appendTo,
      defer,
      transitionName,
      dropdownEmit
    } = inject(keyContainer, {})

    const handleOnEnter = (el, done) => {
      dropdownEmit('open')
      setTimeout(done, 150)
    }
    const handleOnLeave = (el, done) => {
      dropdownEmit('close')
      setTimeout(done, 75)
    }

    return () => (
      <Teleport to={appendTo} defer={defer}>
        <Transition
          name={transitionName.value}
          onEnter={handleOnEnter}
          onAfterEnter={() => dropdownEmit('opened')}
          onLeave={handleOnLeave}
          onAfterLeave={() => dropdownEmit('closed')}
        >{() => slots?.default?.()}</Transition>
      </Teleport>
    )
  }
})
