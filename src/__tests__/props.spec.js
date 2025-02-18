import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { Dropdown } from '../'
import {
  DropdownBaseContent
} from './components/DropdownCore'
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
})
