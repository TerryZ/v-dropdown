import { defineComponent, Teleport, Transition, inject } from 'vue'

import { keyContainer } from './constants'

import type { DropdownContainerContext } from './types'

export default defineComponent({
  name: 'DropdownContentContainer',
  setup(_, { slots }) {
    const {
      appendTo,
      defer,
      transitionName,
      onDropdownOpen,
      onDropdownOpened,
      onDropdownClose,
      onDropdownClosed
    } = inject(keyContainer, {}) as DropdownContainerContext

    const handleOnEnter = (_: Element, done: () => void) => {
      onDropdownOpen()
      setTimeout(done, 150)
    }
    const handleOnAfterEnter = () => {
      onDropdownOpened()
    }
    const handleOnLeave = (_: Element, done: () => void) => {
      onDropdownClose()
      setTimeout(done, 75)
    }
    const handleOnAfterLeave = () => {
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
        >
          {() => slots?.default?.()}
        </Transition>
      </Teleport>
    )
  }
})
