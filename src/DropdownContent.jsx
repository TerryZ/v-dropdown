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
    const { contentClasses, contentStyles } = inject(keyInternal, {})

    if (contentStyles) {
      contentStyles.value['z-index'] = props.zIndex
    }
    if (contentClasses) {
      contentClasses.value = [
        'dd-content',
        props.border || 'dd-no-border',
        getContentRoundedClass(props.rounded)
      ]
    }

    return () => <div class='dd-content-body'>{slots?.default?.()}</div>
  }
})
