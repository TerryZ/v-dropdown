import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import PropsToDropdownContent from './components/PropsToDropdownContent.vue'

describe('dropdown content props', () => {
  const wrapper = mount(PropsToDropdownContent, {
    props: {
      border: false
    },
    global: {
      stubs: {
        transition: false
      }
    }
  })

  const content = wrapper.findComponent('.dd-container')

  test('默认的圆角尺寸应为 `small`', () => {
    expect(content.classes()).toContain('dd-container-rounded--small')
  })
  test('`border` prop 设置为 false, 下拉栏容器应包含 `dd-no-border` 样式名', () => {
    expect(content.classes()).toContain('dd-no-border')
  })
  test('`z-index` prop 设置为 1000, 下拉栏容器的 `z-index` 样式值应为 1000', async () => {
    await wrapper.setProps({ zIndex: 1000 })
    await wrapper.trigger('click')
    expect(content.element.style.zIndex).toBe('1000')
  })
  test('`rounded` prop 设置为 `large`, 容器的圆角尺寸应为 `large`', async () => {
    await wrapper.setProps({ rounded: 'large' })
    expect(content.classes()).toContain('dd-container-rounded--large')
  })
  test('`rounded` prop 设置为 `medium11`, 容器的圆角尺寸应恢复为 `small`', async () => {
    await wrapper.setProps({ rounded: 'medium11' })
    expect(content.classes()).toContain('dd-container-rounded--small')
  })
})
