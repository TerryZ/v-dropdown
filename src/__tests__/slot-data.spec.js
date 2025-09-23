import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import { DropdownWithSlotData } from './components/DropdownCore'

describe('dropdown slot data', async () => {
  // trigger 中的内容使用 scopedSlot 输出的数据
  // content 中使用 useDropdown 工具类获得的依赖注入数据
  const wrapper = mount(DropdownWithSlotData, {
    global: {
      stubs: {
        transition: false
      }
    }
  })

  await nextTick()

  // const content = wrapper.findComponent('.dd-content')
  const content = document.body.querySelector('.dd-content')
  const button = wrapper.find('.dd-default-trigger')

  test('默认状态下，`visible` 值应为 `false`', () => {
    // console.log(wrapper.html())
    expect(button.find('.trigger-data-visible').text()).toBe('visible: false')
    expect(
      content.querySelector('.content-data-visible').textContent.trim()
    ).toBe('visible: false')
  })
  test('默认状态下，`disabled` 值应为 `false`', () => {
    // console.log(content.html())
    expect(button.find('.trigger-data-disabled').text()).toBe('disabled: false')
    expect(
      content.querySelector('.content-data-disabled').textContent.trim()
    ).toBe('disabled: false')
  })
  test('设置 `disabled` prop 为 `true`, `disabled` 值应为 `true`', async () => {
    await wrapper.setProps({ disabled: true })
    expect(button.find('.trigger-data-disabled').text()).toBe('disabled: true')
    expect(
      content.querySelector('.content-data-disabled').textContent.trim()
    ).toBe('disabled: true')
  })
  test('设置 `disabled` prop 为 `false`, `disabled` 值应恢复为 `false`', async () => {
    await wrapper.setProps({ disabled: false })
    expect(button.find('.trigger-data-disabled').text()).toBe('disabled: false')
    expect(
      content.querySelector('.content-data-disabled').textContent.trim()
    ).toBe('disabled: false')
  })
  test('点击 trigger 元素，下拉栏应为打开状态', async () => {
    await wrapper.trigger('click')
    expect(button.find('.trigger-data-visible').text()).toBe('visible: true')
  })
  test('调用 useDropdown 获得的 close 函数，下拉栏应被关闭', async () => {
    content.querySelector('.content-data-close').click()
    await nextTick()
    expect(button.find('.trigger-data-visible').text()).toBe('visible: false')
  })
})
