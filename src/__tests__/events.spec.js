import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { Dropdown } from '@/'
import { DropdownBaseContent } from './components/DropdownCore'

describe('v-dropdown 事件', () => {
  const fnOpen = vi.fn()
  const fnOpened = vi.fn()
  const fnClose = vi.fn()
  const fnClosed = vi.fn()
  const wrapper = mount(Dropdown, {
    slots: {
      default: DropdownBaseContent,
      trigger: h('button', { type: 'button' }, 'trigger')
    },
    props: {
      onOpen: fnOpen,
      onOpened: fnOpened,
      onClose: fnClose,
      onClosed: fnClosed
    },
    global: {
      stubs: {
        transition: false
      }
    }
  })

  it('打开 dropdown, `visible-change` 事件应响应 true 值', async () => {
    vi.useFakeTimers()
    await wrapper.trigger('click')
    expect(wrapper.emitted()['visible-change'][0]).toEqual([true])
  })
  it('响应 `open` 事件', () => {
    expect(fnOpen).toHaveBeenCalled()
  })
  it('响应 `opened` 事件', () => {
    vi.runAllTimers()
    expect(fnOpened).toHaveBeenCalled()
  })
  it('关闭 dropdown, `visible-change` 事件应响应 false 值', async () => {
    await wrapper.trigger('click')
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()['visible-change'][1]).toEqual([false])
  })
  it('响应 `close` 事件', () => {
    expect(fnClose).toHaveBeenCalled()
  })
  it('响应 `closed` 事件', () => {
    vi.runAllTimers()
    expect(fnClosed).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
