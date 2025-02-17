import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { Dropdown } from '@/'

describe('v-dropdown core', () => {
  const wrapper = mount(Dropdown, {
    slots: {
      default: h('div', 'contents'),
      trigger: h('button', { type: 'button' }, 'trigger')
    }
  })

  it('the dropdown container should be closed by default', () => {
    // 默认 visible 状态必须为 false
    expect(wrapper.vm.visible).equal(false)
  })
  // it('call display method, set visible to true, the dropdown container should be displayed', async () => {
  //   wrapper.vm.display()
  //   await nextTick()

  //   expect(wrapper.vm.visible).equal(true)
  //   // visible 状态为 true 时，下拉栏必须为打开状态
  //   expect(wrapper.vm.container.getAttribute('style')).not.include('display: none')
  // })
  // it('call close method, set visible to false, the dropdown container should be closed', async () => {
  //   wrapper.vm.close()
  //   await nextTick()

  //   expect(wrapper.vm.visible).equal(false)
  //   // visible 状态为 false 时，下拉栏必须为关闭状态
  //   expect(wrapper.vm.container.getAttribute('style')).include('display: none')
  // })
})
