import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecommendationCard from '../recommendations/RecommendationCard.vue'
import type { Recommendation } from '@/types'

describe('RecommendationCard', () => {
  const mockRecommendation: Recommendation = {
    name: 'John',
    surname: 'Doe',
    jobPosition: 'Product Manager',
    postDate: '2023-10-15',
    hierarchyMode: 'client',
    postComment:
      'Chechu was an exceptional developer who consistently delivered high-quality work.',
  }

  it('should render full name', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    expect(wrapper.text()).toContain('John Doe')
  })

  it('should render job position', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    expect(wrapper.text()).toContain('Product Manager')
  })

  it('should render comment in quotes', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    const blockquote = wrapper.find('blockquote')
    expect(blockquote.exists()).toBe(true)
    expect(blockquote.text()).toContain('Chechu was an exceptional developer')
  })

  it('should display hierarchy badge for client', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    expect(wrapper.text()).toContain('Chechu was my client')
  })

  it('should display hierarchy badge for colleague', () => {
    const colleagueRec: Recommendation = {
      ...mockRecommendation,
      hierarchyMode: 'colleague',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: colleagueRec },
    })

    expect(wrapper.text()).toContain('We worked together on the same team')
  })

  it('should display hierarchy badge for manager', () => {
    const managerRec: Recommendation = {
      ...mockRecommendation,
      hierarchyMode: 'manager',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: managerRec },
    })

    expect(wrapper.text()).toContain('I managed Chechu directly')
  })

  it('should display hierarchy badge for reports_to', () => {
    const reportsToRec: Recommendation = {
      ...mockRecommendation,
      hierarchyMode: 'reports_to',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: reportsToRec },
    })

    expect(wrapper.text()).toContain('I reported to Chechu directly')
  })

  it('should have proper semantic HTML structure', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('blockquote').exists()).toBe(true)
    expect(wrapper.find('time').exists()).toBe(true)
  })

  it('should have correct ARIA label', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation },
    })

    expect(wrapper.find('article').attributes('aria-label')).toBe('Recommendation entry')
  })
})
