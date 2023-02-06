import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { Dropdown } from '@/'

describe('v-dropdown', () => {
  describe('props', () => {
    const wrapper = mount(Dropdown, {
      props: {
        disabled: true
      }
    })

    it('`disabled` prop set to true, the dropdown container should not be display', () => {
      wrapper.find('.v-dropdown-trigger').trigger('click')

      expect(wrapper.find('.v-dropdown-container').isVisible()).to.equal(false)
    })
  })
})
