import {
  ref,
  computed,
  inject,
  Transition,
  Teleport,
  defineComponent
} from 'vue'
import { injectInternal, ROUNDED_SMALL } from './constants'
import { getElementRect } from './util'
import {
  useContentSizeChangeHandle,
  useDropdownContent,
  useDropdown,
  useTriggerState,
  getContentRoundedClass
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
    const content = ref(null)
    const styles = ref({})
    const classes = computed(() => [
      'dd-content',
      props.border || 'dd-no-border',
      getContentRoundedClass(props.rounded)
    ])

    const {
      position,
      display,
      close,
      getRootRect,
      registerAdjustContent,
      detectTriggerPositionChange,
      dropdownProps,
      dropdownEmit
    } = inject(injectInternal, {})
    const { visible } = useDropdown()
    const { isTriggerByHover } = useTriggerState(dropdownProps?.trigger?.value)

    const {
      transitionName,
      getLeft,
      getTop
    } = useDropdownContent({
      trigger: dropdownProps?.trigger,
      align: dropdownProps?.align,
      gap: dropdownProps?.gap,
      animated: props.animated,
      animationName: props.animationName
    })

    function adjust () {
      const rect = getRootRect()
      const contentRect = getElementRect(content.value)
      const top = getTop(position.value.y, rect, contentRect)
      const left = getLeft(position.value.x, rect, contentRect)

      styles.value['z-index'] = props.zIndex
      styles.value.top = `${top}px`
      styles.value.left = `${left}px`
    }
    function handleClick (e) {
      e.stopPropagation()
      if (!visible.value) return
      detectTriggerPositionChange(adjust)
    }

    registerAdjustContent && registerAdjustContent(adjust)
    useContentSizeChangeHandle(content, adjust)

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
              ref={content}
              style={styles.value}
              class={classes.value}
              v-show={visible && visible.value}
              onMousedown={e => e.stopPropagation()}
              onClick={handleClick}
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
