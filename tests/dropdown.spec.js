import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick } from 'vue'

import { Dropdown } from '@/'

function getCssStyle (el) {
  return window.getComputedStyle(el)
}
function getCssDisplay (el) {
  return getCssStyle(el).display
}

describe('v-dropdown', () => {
  describe('props', () => {
    const wrapper = mount(Dropdown, {
      props: {
        width: 500
      },
      slots: {
        default: h('div', 'contents'),
        trigger: h('button', { type: 'button' }, 'trigger')
      }
    })
    const container = document.querySelector('.v-dropdown-container')

    it('`fullWidth` prop set to true, the trigger container should have `v-dropdown-trigger--full-width` class', async () => {
      await wrapper.setProps({ fullWidth: true })
      expect(wrapper.classes()).toContain('v-dropdown-trigger--full-width')
    })
    it('`width` prop set 500, the dropdown container width should be `500px`', () => {
      expect(getCssStyle(container).width).equal('500px')
    })
    it('`manual` prop set to true, the dropdown container should open by display method', async () => {
      await wrapper.setProps({ manual: true, disabled: false })
      await wrapper.trigger('click')
      expect(getCssDisplay(container)).equal('none')

      wrapper.vm.display()
      await flushPromises()
      await nextTick()
      console.log(getCssDisplay(container))
      console.log(document.body.innerHTML)
      expect(getCssDisplay(container)).not.equal('none')
    })
    it('`disabled` prop set to true, clicking the trigger element, the dropdown container should not be display', async () => {
      await wrapper.setProps({ disabled: true })
      await wrapper.trigger('click')
      expect(getCssDisplay(container)).equal('none')

      wrapper.vm.display()
      await nextTick()
      expect(getCssDisplay(container)).equal('none')

      // await flushPromises()

      // console.log(document.body.innerHTML)
      // console.log(wrapper.get('.v-dropdown-container'))
      // console.log(wrapper.html())

      // 在代码中使用了 setTimeout 执行后续代码，那么在测试时，也必须通过 setTimeout 来获取
      // 后续执行的结果
      // window.setTimeout(() => {
      //   const container = document.body.querySelector('.v-dropdown-container')
      //   console.log(wrapper.emitted())
      //   console.log('display: ', window.getComputedStyle(container).display)
      //   expect(window.getComputedStyle(container).display).not.equal('none')
      // })
      // expect(getCssDisplay(container)).equal('none')
      // wrapper.setProps({ disabled: false })
    })
  })

  describe('events', () => {
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

  describe('methods', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        default: h('div', 'contents'),
        trigger: h('button', { type: 'button' }, 'trigger')
      }
    })
    const containers = document.querySelectorAll('.v-dropdown-container')

    it('call `display` method, the dropdown container should be display', async () => {
      wrapper.vm.display()
      await nextTick()
      expect(getCssDisplay(containers[containers.length - 1])).not.equal('none')
    })
    it('call `close` method, the dropdown container should be close', async () => {
      wrapper.vm.close()
      await nextTick()
      expect(getCssDisplay(containers[containers.length - 1])).equal('none')
    })
    it('call `toggleVisible` method, the dropdown container should be display', async () => {
      wrapper.vm.toggleVisible()
      await nextTick()
      expect(getCssDisplay(containers[containers.length - 1])).not.equal('none')
    })
    it('call `toggleVisible` method again, the dropdown container should be close', async () => {
      wrapper.vm.toggleVisible()
      await nextTick()
      expect(getCssDisplay(containers[containers.length - 1])).equal('none')
    })
  })
})
