import { Dropdown, DropdownContent, DropdownTrigger } from '../../'

import CustomContent from '../../../examples/CustomContent.vue'

export function DropdownBaseContent (props) {
  return (
    <DropdownContent {...props}>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
      <div>0123456789012345678901234567890123456789</div>
    </DropdownContent>
  )
}
export function DropdownBaseTrigger (props) {
  return <DropdownTrigger {...props} />
}
export function PropsToDropdownContent (props) {
  const slots = {
    default: () => <DropdownBaseContent {...props} />,
    trigger: () => <DropdownTrigger />
  }
  return <Dropdown align="center" v-slots={slots} />
}
// 暂不可用，参数无法传递入 trigger，也无法触发 trigger 的重新渲染
export function PropsToDropdownTrigger (props) {
  return (
    <Dropdown>{{
      default: () => <DropdownBaseContent />,
      trigger: () => <DropdownBaseTrigger {...props} />
    }}</Dropdown>
  )
}
export function DropdownWithSlotData (props) {
  const slots = {
    default: () => (
      <DropdownContent>
        <CustomContent />
      </DropdownContent>
    ),
    trigger: data => (
      <DropdownTrigger>
        <div class="trigger-data-visible">
          visible: { String(data.visible.value) }
        </div>
        <div class="trigger-data-disabled">
          disabled: { String(data.disabled.value) }
        </div>
      </DropdownTrigger>
    )
  }
  return <Dropdown {...props} v-slots={slots} />
}
