import { Dropdown, DropdownContent, DropdownTrigger } from '../../'

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
  console.log(props)
  return <DropdownTrigger {...props} />
}
export function PropsToDropdownContent (props) {
  const slots = {
    default: () => <DropdownBaseContent {...props} />,
    trigger: () => <DropdownTrigger />
  }
  return <Dropdown v-slots={slots} />
}
// 暂不可用，参数无法传递入 trigger，也无法触发 trigger 的重新渲染
export function PropsToDropdownTrigger (props) {
  console.log(props)
  return (
    <Dropdown>{{
      default: () => <DropdownBaseContent />,
      trigger: () => <DropdownBaseTrigger {...props} />
    }}</Dropdown>
  )
}
