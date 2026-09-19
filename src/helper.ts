import {
  ROUNDED_SMALL,
  ROUNDED_MEDIUM,
  roundedList,
  contentRoundedList,
  TRIGGER_CLICK,
  TRIGGER_CONTEXTMENU,
  TRIGGER_HOVER
} from './constants'

export { getElementRect } from './util'

import type {
  DropdownTriggerType,
  DropdownTriggerRoundedType,
  DropdownContentRoundedType
} from './types'

export function getTriggerClasses(block: boolean) {
  return ['dd-trigger', { 'dd-trigger--block': block }]
}
export function getRoundedClass(value: DropdownTriggerRoundedType) {
  const level =
    !value || !roundedList.includes(value)
      ? ROUNDED_MEDIUM
      : roundedList.find((val) => val === value)
  return `dd-rounded--${level}`
}
export function getContentRoundedClass(value: DropdownContentRoundedType) {
  const level =
    !value || !contentRoundedList.includes(value)
      ? ROUNDED_SMALL
      : contentRoundedList.find((val) => val === value)
  return `dd-content-rounded--${level}`
}
export function getTriggerState(trigger: DropdownTriggerType = TRIGGER_CLICK) {
  return {
    isTriggerByClick: trigger === TRIGGER_CLICK,
    isTriggerByHover: trigger === TRIGGER_HOVER,
    isTriggerByContextmenu: trigger === TRIGGER_CONTEXTMENU
  }
}
