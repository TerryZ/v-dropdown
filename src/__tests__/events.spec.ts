import { describe, test, expect, vi } from 'vitest'
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
      trigger: () => h('button', { type: 'button' }, 'trigger')
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

  test('打开 dropdown, `visible-change` 事件应响应 true 值', async () => {
    vi.useFakeTimers()
    await wrapper.trigger('click')
    expect(wrapper.emitted()['visible-change'][0]).toEqual([true])
  })
  test('响应 `open` 事件', () => {
    expect(fnOpen).toHaveBeenCalled()
  })
  test('响应 `opened` 事件', () => {
    vi.runAllTimers()
    expect(fnOpened).toHaveBeenCalled()
  })
  test('关闭 dropdown, `visible-change` 事件应响应 false 值', async () => {
    await wrapper.trigger('click')
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()['visible-change'][1]).toEqual([false])
  })
  test('响应 `close` 事件', () => {
    expect(fnClose).toHaveBeenCalled()
  })
  test('响应 `closed` 事件', () => {
    vi.runAllTimers()
    expect(fnClosed).toHaveBeenCalled()
    vi.useRealTimers()
  })
})

// describe('v-dropdown 监听响应处理', () => {
//   test('afsadf', async () => {
//     const wrapper = mount(PropsToDropdownContent)
//     wrapper.vm.$nextTick()
//     // await nextTick()
//     // const mockCallback = vi.fn()

//     // const ro = new ResizeObserver(mockCallback)
//     // const ro = (globalThis.ResizeObserver).mock.instances[0]
//     const observerInstance = vi.mocked(window.ResizeObserver).mock.instances[0]
//     console.log(observerInstance)
//     // 模拟元素 resize
//     // ro.__trigger([{ target: document.createElement('div') }], ro)
//     // instance.__trigger([
//     //   {
//     //     target: wrapper.find('div').element,
//     //     contentRect: { width: 100, height: 50 }
//     //   }
//     // ])
//     // globalThis.ResizeObserver

//     // expect(mockCallback).toHaveBeenCalled()
//     // expect(instance.observe).toHaveBeenCalled()
//     // expect(instance.disconnect).not.toHaveBeenCalled()
//   })
// })
