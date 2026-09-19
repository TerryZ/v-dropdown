import type { ComputedRef, Ref } from 'vue'

export type DropdownTriggerType = 'click' | 'hover' | 'contextmenu'

export type DropdownContentRoundedType = 'small' | 'medium' | 'large' | 'pill'
export type DropdownTriggerRoundedType = DropdownContentRoundedType | 'circle'

export interface DropdownProps {
  disabled?: boolean
  /** Content show up alignment direction */
  align?: 'left' | 'center' | 'right'
  /**
   * Toggle display / close dropdown content
   * @default true
   */
  toggle?: boolean
  /**
   * Manual control the display and hiding of dropdown
   * @default false
   */
  manual?: boolean
  /**
   * Trigger container display mode
   * - false: inline-flex
   * - true: flex
   * @default false
   */
  block?: boolean
  /**
   * Dropdown trigger method
   * - `click` default
   * - `hover`
   * - `contextmenu`
   */
  trigger?: DropdownTriggerType
  /**
   * @default true
   */
  animated?: boolean
  /**
   * The distance(px) between the trigger and the content
   * @default 5
   */
  gap?: number
  /**
   * Dropdown content append target
   * @default 'body'
   */
  appendTo?: string | HTMLElement
}
export interface DropdownContentPosition {
  x: number | null
  y: number | null
}
export interface DropdownElementRect {
  width: number
  height: number
  top: number
  left: number
}
export interface DropdownSlotData {
  disabled: ComputedRef<boolean>
  visible: ComputedRef<boolean>
  adjust: () => void
  open: () => void
  close: () => void
  toggleVisible: () => void
}
export interface DropdownInternalContext {
  contentStyles: Ref<Record<string, string | number>>
  setContentClassGetter: (fn: () => string[]) => void
}
export interface DropdownContainerContext {
  appendTo: string | HTMLElement
  defer: boolean
  transitionName: ComputedRef<string>
  onDropdownOpen: () => void
  onDropdownOpened: () => void
  onDropdownClose: () => void
  onDropdownClosed: () => void
}
