import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { Dropdown } from '@/'
import { DropdownBaseContent } from './components/DropdownCore'

describe('v-dropdown 事件', () => {
  const fnOpen = vi.fn()
  const wrapper = mount(Dropdown, {
    slots: {
      default: DropdownBaseContent,
      trigger: h('button', { type: 'button' }, 'trigger')
    },
    props: {
      onOpen: fnOpen
    }
  })

  it('打开 dropdown, `visible-change` 事件应响应 true 值', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()['visible-change'][0]).toEqual([true])
  })
  it('关闭 dropdown, `visible-change` 事件应响应 false 值', async () => {
    await wrapper.trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()['visible-change'][1]).toEqual([false])
    // expect(fnOpen).toHaveBeenCalled()
  })
})
