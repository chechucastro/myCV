import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../atoms/ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('should render theme toggle button', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should have correct ARIA attributes', () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')

    expect(button.attributes('aria-pressed')).toBe('false')
    expect(button.attributes('aria-label')).toBe('Enable dark mode')
  })

  it('should show moon icon in light mode', () => {
    const wrapper = mount(ThemeToggle)
    const svg = wrapper.find('svg')

    // Moon icon has a path element
    expect(svg.find('path').exists()).toBe(true)
  })

  it('should toggle dark mode on click', async () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')

    await button.trigger('click')

    expect(button.attributes('aria-pressed')).toBe('true')
    expect(button.attributes('aria-label')).toBe('Disable dark mode')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should show sun icon in dark mode', async () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')

    await button.trigger('click')

    // Sun icon has circle and line elements
    expect(wrapper.find('circle').exists()).toBe(true)
    expect(wrapper.findAll('line').length).toBeGreaterThan(0)
  })

  it('should toggle back to light mode', async () => {
    const wrapper = mount(ThemeToggle)
    const button = wrapper.find('button')

    await button.trigger('click') // Dark mode
    await button.trigger('click') // Back to light mode

    expect(button.attributes('aria-pressed')).toBe('false')
    expect(button.attributes('aria-label')).toBe('Enable dark mode')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})

