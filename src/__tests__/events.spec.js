import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { Dropdown } from '@/'

describe('v-dropdown events', () => {
  const wrapper = mount(Dropdown, {
    slots: {
      default: h('div', 'contents'),
      trigger: h('button', { type: 'button' }, 'trigger')
    }
  })

  it('open the dropdown container, the `visible-change` event should return true', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()['visible-change'][0]).toEqual([true])
  })
  it('close the dropdown container, the `visible-change` event should return false', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()['visible-change'][1]).toEqual([false])
  })
})
