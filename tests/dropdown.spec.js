import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import { Dropdown } from '@/'

describe('v-dropdown', () => {
  describe('props', () => {
    const wrapper = mount(Dropdown, {
      props: {
        disabled: false
      },
      slots: {
        default: h('div', 'contents'),
        trigger: h('button', { type: 'button' }, 'trigger')
      }
    })

    it('`disabled` prop set to true, the dropdown container should not be display', async () => {
      // await wrapper.find('.v-dropdown-trigger').trigger('click')
      await wrapper.trigger('click')

      console.log(wrapper.emitted())

      console.log(document.body.innerHTML)
      // console.log(wrapper.get('.v-dropdown-container'))
      console.log(wrapper.html())

      const container = document.body.querySelector('.v-dropdown-container')
      console.log('display: ', window.getComputedStyle(container).display)
      expect()
    })
  })
})
