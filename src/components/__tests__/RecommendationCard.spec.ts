import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecommendationCard from '../molecules/RecommendationCard.vue'
import type { Recommendation } from '@/types'

describe('RecommendationCard', () => {
  const mockRecommendation: Recommendation = {
    name: 'Divya',
    surname: 'E',
    postDate: '2023-10-15',
    hierarchyMode: 'client',
    linkedInUrl: 'https://www.linkedin.com/in/divya-e-11463740/?locale=en_US',
  }

  it('should render full name', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    expect(wrapper.text()).toContain('Divya E')
  })

  it('should render job position', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    // Check for the actual job position from i18n translations
    // Note: The full string might be rendered, checking for the main part
    expect(wrapper.text()).toContain('Talent Acquisition Lead at Intelligenz IT')
  })

  it('should render comment in quotes', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    const blockquote = wrapper.find('blockquote')
    expect(blockquote.exists()).toBe(true)
    // Check for actual comment from i18n translations
    expect(blockquote.text()).toContain('I had the pleasure of hiring chechu on a Vuejs project')
  })

  it('should display hierarchy badge for client', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    expect(wrapper.text()).toContain('Chechu was my client')
  })

  it('should display hierarchy badge for colleague', () => {
    const colleagueRec: Recommendation = {
      name: 'Test',
      surname: 'User',
      postDate: '2023-10-15',
      hierarchyMode: 'colleague',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: colleagueRec, recommendationIndex: 0 },
    })

    expect(wrapper.text()).toContain('We worked together on the same team')
  })

  it('should display hierarchy badge for manager', () => {
    const managerRec: Recommendation = {
      name: 'Test',
      surname: 'User',
      postDate: '2023-10-15',
      hierarchyMode: 'manager',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: managerRec, recommendationIndex: 0 },
    })

    expect(wrapper.text()).toContain('I managed Chechu directly')
  })

  it('should display hierarchy badge for reports_to', () => {
    const reportsToRec: Recommendation = {
      name: 'Test',
      surname: 'User',
      postDate: '2023-10-15',
      hierarchyMode: 'reports_to',
    }

    const wrapper = mount(RecommendationCard, {
      props: { recommendation: reportsToRec, recommendationIndex: 0 },
    })

    expect(wrapper.text()).toContain('I reported to Chechu directly')
  })

  it('should have proper semantic HTML structure', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    expect(wrapper.find('article').exists()).toBe(true)
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('blockquote').exists()).toBe(true)
    expect(wrapper.find('time').exists()).toBe(true)
  })

  it('should have correct ARIA label', () => {
    const wrapper = mount(RecommendationCard, {
      props: { recommendation: mockRecommendation, recommendationIndex: 0 },
    })

    expect(wrapper.find('article').attributes('aria-label')).toBe('Recommendation entry')
  })
})
