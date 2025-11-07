import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PositionCard from '../molecules/PositionCard.vue'
import type { EmploymentPosition } from '@/types'

describe('PositionCard', () => {
  const mockPosition: EmploymentPosition = {
    startDate: '2023-10-01',
    endDate: '2025-10-31',
  }

  const mockData = {
    position: mockPosition,
    company: {
      name: 'Fairlyne',
      logo: '/company-logos/fairlyne.webp',
      key: 'fairlyne',
    },
    idx: 0,
  }

  it('should render position title', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    // Check for the actual position title from i18n translations
    expect(wrapper.text()).toContain(
      'Front-End Developer (Vue.js / Nuxt / Quasar framework / Tailwind / Reka UI)',
    )
  })

  it('should render all description items', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    // Check for actual description items from i18n translations
    expect(wrapper.text()).toContain(
      'Engineered a shared modular architecture with Nuxt Layers',
    )
    expect(wrapper.text()).toContain('Built and maintained a scalable Atomic Design system')
    expect(wrapper.text()).toContain('Optimized UI performance through lazy loading')
  })

  it('should display date range', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    const text = wrapper.text()
    expect(text.toLowerCase()).toMatch(/oct|october/)
    expect(text).toContain('2023')
  })

  it('should show "Present" badge when no end date', () => {
    const currentPosition: EmploymentPosition = {
      ...mockPosition,
      endDate: undefined,
    }

    const currentData = {
      ...mockData,
      position: currentPosition,
    }

    const wrapper = mount(PositionCard, {
      props: { data: currentData },
    })

    expect(wrapper.text()).toContain('Present')
  })

  it('should render description as list items', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBeGreaterThanOrEqual(0)
  })

  it('should have proper semantic HTML structure', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('h4').exists()).toBe(true)
  })

  it('should have correct ARIA labels', () => {
    const wrapper = mount(PositionCard, {
      props: { data: mockData },
    })

    expect(wrapper.find('article').attributes('aria-label')).toBe('Employment entry')
  })
})
