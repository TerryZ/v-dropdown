import {
  ref,
  computed,
  inject,
  Transition,
  Teleport,
  onMounted,
  onBeforeUnmount,
  defineComponent
} from 'vue'
import { injectInternal, ROUNDED_SMALL } from './constants'
import { getElementRect } from './util'
import {
  useContainerSizeChangeHandle,
  useDropdownContainer,
  useDropdown,
  useTriggerState,
  getContainerRoundedClass
} from './helper'

export default defineComponent({
  name: 'DropdownContent',
  inheritAttrs: false,
  props: {
    border: { type: Boolean, default: true },
    animated: { type: Boolean, default: true },
    animationName: { type: String, default: '' },
    rounded: { type: String, default: ROUNDED_SMALL },
    zIndex: { type: Number, default: 3000 }
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
      position,
      display,
      close,
      getRootRect,
      registerAdjustContent,
      dropdownProps,
      dropdownEmit
    } = inject(injectInternal, {})
    const { isTriggerByHover } = useTriggerState(dropdownProps?.trigger?.value)

    const {
      transitionName,
      getLeft,
      getTop
    } = useDropdownContainer({
      trigger: dropdownProps?.trigger,
      align: dropdownProps?.align,
      gap: dropdownProps?.gap,
      animated: props.animated,
      animationName: props.animationName
    })
    const {
      containerSizeObserve,
      containerSizeUnobserve
    } = useContainerSizeChangeHandle(container, adjust)

    function adjust () {
      const rect = getRootRect()
      const containerRect = getElementRect(container.value)
      const top = getTop(position.value.y, rect, containerRect)
      const left = getLeft(position.value.x, rect, containerRect)

      styles.value['z-index'] = props.zIndex
      styles.value.top = `${top}px`
      styles.value.left = `${left}px`
    }

    registerAdjustContent && registerAdjustContent(adjust)
    onMounted(containerSizeObserve)
    onBeforeUnmount(containerSizeUnobserve)

    return () => (
      <Teleport to='body'>
        <Transition
          name={transitionName.value}
          onEnter={(el, done) => {
            dropdownEmit('open')
            done()
          }}
          onAfterEnter={() => {
            dropdownEmit('opened')
          }}
          onLeave={(el, done) => {
            dropdownEmit('close')
            done()
          }}
          onAfterLeave={() => dropdownEmit('closed')}
        >
          {() => (
            <div
              ref={container}
              style={styles.value}
              class={classes.value}
              v-show={visible && visible.value}
              onMousedown={e => e.stopPropagation()}
              onMouseenter={() => isTriggerByHover && display()}
              onMouseleave={() => isTriggerByHover && close()}
              {...attrs}
            >{slots?.default?.()}</div>
          )}
        </Transition>
      </Teleport>
    )
  }
})
