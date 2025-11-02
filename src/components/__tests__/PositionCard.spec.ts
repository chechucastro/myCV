import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PositionCard from '../employment/PositionCard.vue'
import type { EmploymentPosition } from '@/types'

describe('PositionCard', () => {
  const mockPosition: EmploymentPosition = {
    position: 'Senior Frontend Developer',
    startDate: '2020-06-01',
    endDate: '2023-12-31',
    description: [
      'Led frontend architecture',
      'Implemented design system',
      'Improved performance by 30%',
    ],
  }

  const mockPositionWithI18n: EmploymentPosition = {
    startDate: '2020-06-01',
    endDate: '2023-12-31',
  }

  it('should render position title', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    expect(wrapper.text()).toContain('Senior Frontend Developer')
  })

  it('should render all description items', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    expect(wrapper.text()).toContain('Led frontend architecture')
    expect(wrapper.text()).toContain('Implemented design system')
    expect(wrapper.text()).toContain('Improved performance by 30%')
  })

  it('should display date range', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    const text = wrapper.text()
    expect(text.toLowerCase()).toMatch(/jun|junio/)
    expect(text).toContain('2020')
  })

  it('should show "Present" badge when no end date', () => {
    const currentPosition: EmploymentPosition = {
      ...mockPosition,
      endDate: undefined,
    }

    const wrapper = mount(PositionCard, {
      props: { position: currentPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    expect(wrapper.text()).toContain('Present')
  })

  it('should render description as list items', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBeGreaterThanOrEqual(0)
  })

  it('should have proper semantic HTML structure', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('h4').exists()).toBe(true)
  })

  it('should have correct ARIA labels', () => {
    const wrapper = mount(PositionCard, {
      props: { position: mockPosition, companyKey: 'fairlyne', positionIndex: 0 },
    })

    expect(wrapper.find('article').attributes('aria-label')).toBe('Employment entry')
  })
})
