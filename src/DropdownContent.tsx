import { inject, defineComponent } from 'vue'
import { keyInternal, ROUNDED_SMALL, Z_INDEX } from './constants'
import { getContentRoundedClass } from './helper'

import type { PropType } from 'vue'
import type { DropdownContentRoundedType, DropdownInternalContext } from './types'

export default defineComponent({
  name: 'DropdownContent',
  // inheritAttrs: false,
  props: {
    border: { type: Boolean, default: true },
    rounded: { type: String as PropType<DropdownContentRoundedType>, default: ROUNDED_SMALL },
    zIndex: { type: Number, default: Z_INDEX }
  },
  setup(props, { slots }) {
    const { setContentClassGetter, contentStyles } = inject(
      keyInternal,
      {}
    ) as DropdownInternalContext

    setContentClassGetter?.(() => {
      const classes = ['dd-content', getContentRoundedClass(props.rounded)]
      if (!props.border) classes.push('dd-no-border')
      return classes
    })

    return () => {
      if (contentStyles) {
        contentStyles.value['z-index'] = props.zIndex
      }
      return <div class="dd-content-body">{slots?.default?.()}</div>
    }
  }
})
