import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CertificationCard from '../certifications/CertificationCard.vue'
import type { Certification } from '@/types'

describe('CertificationCard', () => {
  const mockCertification: Certification = {
    title: 'Vue.js 3 Certification',
    issuedBy: 'Vue School',
    issuedDate: '2023-08-15',
    certificateImage: '/certificates/vue-cert.jpg',
    certificateLink: 'https://vueschool.io/certificates/test',
  }

  it('should render certification title', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    expect(wrapper.text()).toContain('Vue.js 3 Certification')
  })

  it('should render issuer information', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    expect(wrapper.text()).toContain('Issued by:')
    expect(wrapper.text()).toContain('Vue School')
  })

  it('should render certificate image', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/certificates/vue-cert.jpg')
    expect(img.attributes('alt')).toContain('certificate')
  })

  it('should render certificate link', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('https://vueschool.io/certificates/test')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('should have View Certificate button text', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    expect(wrapper.text()).toContain('View Certificate')
  })

  it('should have proper ARIA label for link', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    const link = wrapper.find('a')
    expect(link.attributes('aria-label')).toContain('View Vue.js 3 Certification certificate')
  })

  it('should use lazy loading for image', () => {
    const wrapper = mount(CertificationCard, {
      props: { certification: mockCertification },
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
