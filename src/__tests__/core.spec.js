import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { Dropdown } from '@/'
// import { } from '../../src/helper'
import { getElementRect } from '../../src/util'

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

describe('utils', () => {
  test('getElementRect 提供的 dom 元素为空时，应均响应 0 值', () => {
    const rect = getElementRect(null)
    expect(rect).toEqual({
      left: 0,
      top: 0,
      width: 0,
      height: 0
    })
  })
})
