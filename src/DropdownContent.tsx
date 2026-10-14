import { ref, inject, defineComponent } from 'vue'
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
  setup(props, { slots, attrs }) {
    const contentClass = ref<string[]>(['dd-content-body', getContentRoundedClass(props.rounded)])
    const { contentStyles, contentClasses } = inject(keyInternal, {}) as DropdownInternalContext

    if (!props.border) contentClass.value.push('dd-no-border')

    // setContentClassGetter?.(() => {
    //   const classes = ['dd-content', getContentRoundedClass(props.rounded)]
    //   // const classes = ['dd-content']
    //   // if (!props.border) classes.push('dd-no-border')
    //   return classes
    // })

    console.log(contentClasses)
    if (contentClasses) {
      contentClasses.value = ['dd-content', getContentRoundedClass(props?.rounded)]
      console.log(attrs)
      if (attrs.class) contentClasses?.value.push(attrs.class)
    }

    if (contentStyles) {
      contentStyles.value['z-index'] = props.zIndex
    }

    return () => slots?.default?.({ text: '123' })

    // TODO: 这里的 div 考虑是否可以去掉
    // return () => {
    //   if (contentStyles) {
    //     contentStyles.value['z-index'] = props.zIndex
    //   }

    //   return <div class={contentClass.value}>{slots?.default?.()}</div>
    // }
  }
})
