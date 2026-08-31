import { inject, defineComponent } from 'vue'
import { keyInternal, ROUNDED_SMALL, Z_INDEX } from './constants'
import { getContentRoundedClass } from './helper'

export default defineComponent({
  name: 'DropdownContent',
  // inheritAttrs: false,
  props: {
    border: { type: Boolean, default: true },
    rounded: { type: String, default: ROUNDED_SMALL },
    zIndex: { type: Number, default: Z_INDEX }
  },
  setup (props, { slots, attrs }) {
    const { setContentClassGetter, contentStyles } = inject(keyInternal, {})

    setContentClassGetter?.(() => {
      const classes = ['dd-content', getContentRoundedClass(props.rounded)]
      if (!props.border) classes.push('dd-no-border')
      return classes
    })

    return () => {
      if (contentStyles) {
        contentStyles.value['z-index'] = props.zIndex
      }
      return <div class='dd-content-body'>{slots?.default?.()}</div>
    }
  }
})
