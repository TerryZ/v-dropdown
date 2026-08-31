import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { Dropdown } from '@/'

describe('v-dropdown methods', () => {
  const wrapper = mount(Dropdown, {
    slots: {
      default: h('div', 'contents'),
      trigger: h('button', { type: 'button' }, 'trigger')
    }
  })

  it('call `display` method, the dropdown container should be display', async () => {
    wrapper.vm.open()
    await nextTick()
    expect(wrapper.vm.visible).equal(true)
  })
  it('call `close` method, the dropdown container should be close', async () => {
    wrapper.vm.close()
    await nextTick()
    expect(wrapper.vm.visible).equal(false)
  })
  it('call `toggleVisible` method, the dropdown container should be display', async () => {
    wrapper.vm.toggleVisible()
    await nextTick()
    expect(wrapper.vm.visible).equal(true)
  })
  it('call `toggleVisible` method again, the dropdown container should be close', async () => {
    wrapper.vm.toggleVisible()
    await nextTick()
    expect(wrapper.vm.visible).equal(false)
  })
})
