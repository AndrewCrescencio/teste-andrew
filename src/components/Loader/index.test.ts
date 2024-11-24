import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Loader from './index.vue'

describe('component Loader.vue', () => {
  const wrapper = mount(Loader)
  it('should render', () => {
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
