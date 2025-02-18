import { describe, it, expect, vi, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { Dropdown } from '../'
import {
  DropdownBaseContent
} from './components/DropdownCore'
import PropsToDropdownTrigger from './components/PropsToDropdownTrigger.vue'
import PropsToDropdownContent from './components/PropsToDropdownContent.vue'
// import { getCssStyle } from './util'

describe('v-dropdown props', () => {
  describe('dropdown props', () => {
    const wrapper = mount(Dropdown, {
      props: {
        width: 500,
        customTriggerClass: 'custom-trigger',
        customContainerClass: 'custom-container'
      },
      slots: {
        default: DropdownBaseContent,
        trigger: h('button', { type: 'button' }, 'trigger')
      }
    })

    // it('`customTriggerClass` set `custom-trigger` value, the dropdown container should have `custom-trigger` class', () => {
    //   expect(wrapper.classes('custom-trigger')).toBeTruthy()
    // })
    // it('`customContainerClass` set `custom-container` value, the trigger container should have `custom-container` class', () => {
    //   expect(wrapper.vm.container.classList.contains('custom-container')).toBeTruthy()
    // })
    it('`block` prop 设置为 true, 触发元素容器应包含 `dd-trigger--block` 样式名', async () => {
      await wrapper.setProps({ block: true })
      expect(wrapper.classes()).toContain('dd-trigger--block')
    })
    // it('`width` prop set 500, the dropdown container width should be `500px`', () => {
    //   expect(getCssStyle(wrapper.vm.container).width).equal('500px')
    // })
    it('`toggle` prop set to false, when dropdown container opened and click trigger element again, the dropdown container should not be closed', async () => {
      await wrapper.setProps({ toggle: false })
      await wrapper.trigger('click')
      // 首次点击，打开下拉栏
      expect(wrapper.vm.visible).equal(true)
      await wrapper.trigger('click')
      // 再次点击，下拉栏不会收起，依然处于打开状态
      expect(wrapper.vm.visible).equal(true)
    })
    it('`manual` prop set to true, the dropdown container should only can open by display method', async () => {
      await wrapper.setProps({ toggle: true, manual: true })

      // 关闭窗口重置状态
      wrapper.vm.close()
      await nextTick()

      await wrapper.trigger('click')
      expect(wrapper.vm.visible).equal(false)

      wrapper.vm.display()
      await nextTick()
      expect(wrapper.vm.visible).equal(true)
    })
    it('`disabled` prop set to true, clicking the trigger element, the dropdown container should not be display', async () => {
      // 关闭窗口重置状态
      wrapper.vm.close()
      await nextTick()

      await wrapper.setProps({ disabled: true })
      await wrapper.trigger('click')
      expect(wrapper.vm.visible).equal(false)

      wrapper.vm.display()
      await nextTick()
      expect(wrapper.vm.visible).equal(false)
    })
  })

  describe('trigger mode', () => {
    describe('trigger by click', () => {
      const wrapper = mount(Dropdown, {
        slots: {
          default: h('div', 'contents'),
          trigger: h('button', { type: 'button' }, 'trigger')
        }
      })
      it('click trigger to open dropdown container', async () => {
        await wrapper.trigger('click')
        expect(wrapper.vm.visible).equal(true)
      })
      it('click trigger again to close dropdown container', async () => {
        await wrapper.trigger('click')
        expect(wrapper.vm.visible).equal(false)
      })
      it('click outside of trigger container and dropdown container to close dropdown container', async () => {
        await wrapper.trigger('click')
        expect(wrapper.vm.visible).equal(true)

        // 组件外区域点击，关闭下拉栏
        document.body.dispatchEvent(new Event('mousedown'))
        await nextTick()
        expect(wrapper.vm.visible).equal(false)
      })
    })
    describe('trigger by hover', () => {
      const wrapper = mount(Dropdown, {
        props: {
          trigger: 'hover'
        },
        slots: {
          default: h('div', 'contents'),
          trigger: h('button', { type: 'button' }, 'trigger')
        }
      })
      it('mouseenter / mouseleave trigger container to display / close dropdown container', async () => {
        vi.useFakeTimers()

        expect(wrapper.vm.visible).equal(false)

        await wrapper.trigger('mouseenter')
        vi.runAllTimers()
        expect(wrapper.vm.visible).equal(true)
        await wrapper.trigger('mouseleave')
        vi.runAllTimers()
        expect(wrapper.vm.visible).equal(false)

        vi.useRealTimers()
      })
    })
    describe('trigger by contextmenu', () => {
      const wrapper = mount(Dropdown, {
        props: {
          trigger: 'contextmenu'
        },
        slots: {
          default: h('div', 'contents'),
          trigger: h('button', { type: 'button' }, 'trigger')
        }
      })
      it('mouse right click trigger container area, the dropdown container should be displayed', async () => {
        await wrapper.trigger('click')
        // 鼠标左健点击，不作响应
        expect(wrapper.vm.visible).equal(false)

        await wrapper.trigger('contextmenu')
        expect(wrapper.vm.visible).equal(true)
      })
    })
  })

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
      await nextTick()
      console.log(wrapper.html())
      console.log(content.html())
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
})
