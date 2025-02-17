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
export function PropsToDropdownContent (props) {
  const slots = {
    default: () => <DropdownBaseContent {...props} />,
    trigger: () => <DropdownTrigger />
  }
  return <Dropdown v-slots={slots} />
}
export function PropsToDropdownTrigger (props) {
  const slots = {
    default: () => <DropdownBaseContent />,
    trigger: () => <DropdownTrigger {...props} />
  }
  return <Dropdown v-slots={slots} />
}
