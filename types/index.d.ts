import {
  DefineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin
} from 'vue'

type EmitEvents = 'visible-change'

/**
 * Dropdown props
 */
declare interface Props {
  /**
   * dropdown container alignment direction (default: `left`)
   */
  align: string
  /**
   * whether to display the border (default: true)
   */
  border?: boolean
  /**
   * toggle display / close dropdown container
   */
  toggle: boolean
  /**
   * manual show / close the dropdown
   */
  manual?: boolean
  /**
   * open / close dropdown animation
   *
   * {boolean}
   * - true: use default animation
   * - false: don't display animation
   * {string} customized animation class-name
   */
  animated?: boolean|string
  /**
   * disabled the dropdown (default: false)
   */
  disabled?: boolean
  /**
   * the width of dropdown container
   * min-width: 80
   */
  width?: number
  /**
   * trigger container display type (default: false)
   * - false: inline-block
   * - true: block
   */
  fullWidth?: boolean
  /**
   * dropdown trigger method
   * - `click` default
   * - `hover`
   * - `contextmenu`
   */
  trigger?: 'click' | 'hover' | 'contextmenu'
}

declare interface Methods extends MethodOptions {
  /** Display dropdown container */
  display: () => void
  /** Close dropdown container */
  close: () => void
  /** Toggle dropdown container display / close */
  toggleVisible: () => void
  /** Adjust dropdown container position */
  adjust: () => void
}

declare const Dropdown: DefineComponent<
  Props,
  {},
  {},
  ComputedOptions,
  Methods,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitEvents[],
  EmitEvents,
  Props
>

export { Dropdown }

export default Dropdown
