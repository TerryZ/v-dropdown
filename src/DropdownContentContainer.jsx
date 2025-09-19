import { defineComponent, Teleport, Transition, inject } from 'vue'

import { keyContainer } from './constants'

export default defineComponent({
  name: 'DropdownContentContainer',
  setup (props, { slots }) {
    const {
      appendTo,
      defer,
      transitionName,
      dropdownEmit,
      onOpened
    } = inject(keyContainer, {})

    const handleOnEnter = (el, done) => {
      dropdownEmit('open')
      setTimeout(done, 150)
    }
    const handleOnAfterEnter = el => {
      // dropdownEmit('opened')
      onOpened()
    }
    const handleOnLeave = (el, done) => {
      dropdownEmit('close')
      setTimeout(done, 75)
    }
    const handleOnAfterLeave = el => {
      dropdownEmit('closed')
    }

    return () => (
      <Teleport to={appendTo} defer={defer}>
        <Transition
          name={transitionName.value}
          onEnter={handleOnEnter}
          onAfterEnter={handleOnAfterEnter}
          onLeave={handleOnLeave}
          onAfterLeave={handleOnAfterLeave}
        >{() => slots?.default?.()}</Transition>
      </Teleport>
    )
  }
})
