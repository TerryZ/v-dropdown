import { defineComponent, Teleport, Transition, inject } from 'vue'

import { keyContainer } from './constants'

export default defineComponent({
  name: 'DropdownContentContainer',
  setup (props, { slots }) {
    const {
      appendTo,
      defer,
      transitionName,
      onDropdownOpen,
      onDropdownOpened,
      onDropdownClose,
      onDropdownClosed
    } = inject(keyContainer, {})

    const handleOnEnter = (el, done) => {
      onDropdownOpen()
      setTimeout(done, 150)
    }
    const handleOnAfterEnter = el => {
      onDropdownOpened()
    }
    const handleOnLeave = (el, done) => {
      onDropdownClose()
      setTimeout(done, 75)
    }
    const handleOnAfterLeave = el => {
      onDropdownClosed()
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
