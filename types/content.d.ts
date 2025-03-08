import { VNode } from 'vue'
import { ComponentProps } from './dropdown'

declare interface ContentProps extends ComponentProps {
  /**
   * @default true
   */
  border?: boolean
  /**
   * @default true
   */
  animated?: boolean
  /**
   * @default `small`
   */
  rounded?: 'small' | 'medium' | 'large'
  /**
   * @default 3000
   */
  zIndex?: number
}

declare interface DropdownContent {
  new (): {
    $props: ContentProps
    $slots: {
      default?: () => VNode[]
    }
  }
}

declare const DropdownContent: DropdownContent

export { DropdownContent }
