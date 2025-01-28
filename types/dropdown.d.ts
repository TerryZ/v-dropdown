import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode,
  Ref
} from 'vue'

export declare interface ComponentProps extends
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps {}

export declare interface DropdownUtilities {
  readonly visible: Ref<boolean>
  readonly disabled: Ref<boolean>
  /**
   * Close the dropdown menu when it is open
   */
  close: () => void
}

/**
 * Dropdown props
 */
declare interface Props {
  /**
   * Container show up alignment direction
   * @default `left`
   */
  align?: 'left' | 'center' | 'right'
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
   * Disabled the dropdown
   * @default false
   */
  disabled?: boolean
  /**
   * Trigger container display mode
   * - false: inline
   * - true: block
   * @default false
   */
  block?: boolean
  /**
   * Dropdown trigger method
   * - `click`
   * - `hover`
   * - `contextmenu`
   * @default `click`
   */
  trigger?: 'click' | 'hover' | 'contextmenu'
  /**
   * @default 5
   */
  gap?: number
}
declare interface TriggerProps extends ComponentProps {
  rounded?: 'small' | 'medium' | 'large' | 'pill' | 'circle'
}

/** Dropdown container visible change event */
type EmitVisibleChange = (event: 'visible-change', value: boolean) => void
type EmitOpen = (event: 'open') => void
type EmitOpened = (event: 'opened') => void
type EmitClose = (event: 'close') => void
type EmitClosed = (event: 'closed') => void

declare interface Dropdown {
  new (): {
    $props: Props
    $emit: EmitVisibleChange & EmitOpen & EmitOpened & EmitClose & EmitClosed
    $slots: {
      default?: (slotData: DropdownUtilities) => VNode[]
      trigger?: (slotData: DropdownUtilities) => VNode[]
    }
  }
}
declare interface DropdownTrigger {
  new (): {
    $props: TriggerProps
    $slots: {
      default?: () => VNode[]
      append?: () => VNode[]
    }
  }
}

/** The dropdown container */
declare const Dropdown: Dropdown
declare const DropdownTrigger: DropdownTrigger

export declare function useDropdown (): DropdownUtilities

export { Dropdown, DropdownTrigger }
