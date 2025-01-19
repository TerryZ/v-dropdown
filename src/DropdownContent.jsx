import { ref, computed, inject, Transition, Teleport, onMounted, onBeforeUnmount } from 'vue'
import { injectInternal, ROUNDED_SMALL } from './constants'
import { getElementRect } from './util'
import {
  useContainerSizeChangeHandle,
  useDropdownContainer,
  useDropdown,
  useTriggerState,
  getContainerRoundedClass
} from './helper'

export default {
  name: 'DropdownContent',
  inheritAttrs: false,
  props: {
    border: { type: Boolean, default: true },
    animated: { type: Boolean, default: true },
    animationName: { type: String, default: '' },
    rounded: { type: String, default: ROUNDED_SMALL }
  },
  setup (props, { slots, attrs }) {
    const container = ref(null)
    const styles = ref({})
    const classes = computed(() => [
      'dd-container',
      props.border || 'dd-no-border',
      getContainerRoundedClass(props.rounded)
    ])

    const { visible } = useDropdown()
    const {
      slotData,
      position,
      display,
      close,
      getRootRect,
      dropdownProps,
      dropdownEmit
    } = inject(injectInternal)
    const { isTriggerByHover } = useTriggerState(dropdownProps.trigger.value)

    const {
      animationName,
      getLeft,
      getTop
    } = useDropdownContainer(dropdownProps.trigger.value, dropdownProps.align.value)
    const {
      containerSizeObserve,
      containerSizeUnobserve
    } = useContainerSizeChangeHandle(container, adjust)

    function adjust () {
      const rect = getRootRect()
      const containerRect = getElementRect(container.value)
      console.log(container.value.offsetHeight)
      const top = getTop(position.y, rect, containerRect)
      const left = getLeft(position.x, rect, containerRect)

      styles.value.top = `${top}px`
      styles.value.left = `${left}px`
    }

    onMounted(() => {
      containerSizeObserve()
      // console.log(container.value)
    })
    onBeforeUnmount(() => {
      containerSizeUnobserve()
      // container?.value?.remove?.()
    })

    return () => (
      <Teleport to='body'>
        <Transition
          name={animationName.value}
          onEnter={() => dropdownEmit('open')}
          onAfterEnter={() => dropdownEmit('opened')}
          onLeave={() => dropdownEmit('close')}
          onAfterLeave={() => dropdownEmit('closed')}
        >
          {() => (
            <div
              ref={container}
              style={styles.value}
              class={classes.value}
              v-show={visible.value}
              onMousedown={e => e.stopPropagation()}
              onMouseenter={() => isTriggerByHover && display()}
              onMouseleave={() => isTriggerByHover && close()}
              {...attrs}
            >{slots?.default?.(slotData)}</div>
          )}
        </Transition>
      </Teleport>
    )
  }
}
