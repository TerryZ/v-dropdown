import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'

export declare interface TriggerSlotData {
  visible: boolean
  disabled: boolean
}

/**
 * Dropdown props
 */
declare interface Props {
  /**
   * Container show up alignment direction
   * @default `left`
   */
  align?: 'left'|'center'|'right'
  /**
   * Whether to display the border
   * @default true
   */
  border?: boolean
  /**
   * Toggle display / close dropdown container
   * @default true
   */
  toggle?: boolean
  /**
   * Manual control the display and hiding of dropdown
   * @default false
   */
  manual?: boolean
  /**
   * Open / close dropdown animation
   *
   * {boolean}
   * - true: use default animation
   * - false: don't display animation
   * {string} customized animation class-name
   * @default true
   */
  animated?: boolean|string
  /**
   * Disabled the dropdown
   * @default false
   */
  disabled?: boolean
  /**
   * The width of dropdown container
   * min-width: 80
   */
  width?: number
  /**
   * Trigger container display type
   * - false: inline-block
   * - true: block
   * @default false
   */
  fullWidth?: boolean
  /**
   * Dropdown trigger method
   * - `click`
   * - `hover`
   * - `contextmenu`
   * @default `click`
   */
  trigger?: 'click' | 'hover' | 'contextmenu'
  /** Add custom class to trigger */
  customTriggerClass?: string
  /** Add custom class to container */
  customContainerClass?: string
}

// declare interface Methods extends MethodOptions {
//   /** Display dropdown container */
//   display: () => void
//   /** Close dropdown container */
//   close: () => void
//   /** Toggle dropdown container display / close */
//   toggleVisible: () => void
//   /** Adjust dropdown container position */
//   adjust: () => void
// }

/** Dropdown container visible change event */
type EmitVisibleChange = (event: 'visible-change', value: boolean) => void

declare interface Dropdown {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & Props
    $emit: EmitVisibleChange
    $slots: {
      default?: () => VNode[]
      trigger?: (triggerSlotData: TriggerSlotData) => VNode[]
    }
  }
}

/** The dropdown container */
declare const Dropdown: Dropdown

export { Dropdown }

export default Dropdown
