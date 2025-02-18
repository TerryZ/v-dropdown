import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import PropsToDropdownTrigger from './components/PropsToDropdownTrigger.vue'

describe('built-in dropdown trigger props', () => {
  const wrapper = mount(PropsToDropdownTrigger, {
    slots: {
      default: h('div', 'Custom content'),
      append: h('span', 'Custom icon')
    }
  })

  test('自定义按钮内容文本应为 `Custom content`', () => {
    expect(wrapper.find('button').find('div').text()).toBe('Custom content')
  })
  test('自定义按钮图标内容应为 `Custom icon`', () => {
    expect(wrapper.find('button').find('span').text()).toBe('Custom icon')
  })
  test('默认的圆角尺寸应为 `medium`', () => {
    expect(wrapper.find('button').classes()).toContain('dd-rounded--medium')
  })
  test('`rounded` prop 设置为 `pill`, 容器的圆角尺寸应为 `pill`', async () => {
    await wrapper.setProps({ rounded: 'pill' })
    // console.log(wrapper.find('button').classes())
    expect(wrapper.find('button').classes()).toContain('dd-rounded--pill')
  })
  test('`rounded` prop 设置为 `circle`, 容器的圆角尺寸应为 `circle`', async () => {
    await wrapper.setProps({ rounded: 'circle' })
    expect(wrapper.find('button').classes()).toContain('dd-rounded--circle')
  })
  test('`rounded` prop 设置为 `large11`, 容器的圆角尺寸应恢复为 `medium`', async () => {
    await wrapper.setProps({ rounded: 'large11' })
    expect(wrapper.find('button').classes()).toContain('dd-rounded--medium')
  })
})
