/**
 * Application configuration constants
 *
 * Centralized configuration values that can be adjusted without modifying component code.
 */

import type { ContactInfo } from '@/types'

/**
 * Number of top skills to display initially before showing "Show More" button
 */
export const TOP_SKILLS_COUNT = 5

/**
 * Contact information used across the application
 */
export const CONTACT_INFO: ContactInfo = {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
  linkedin: {
    url: 'https://www.linkedin.com/in/chechucastro',
    handle: 'linkedin.com/in/chechucastro',
  },
  github: {
    url: 'https://github.com/chechucastro',
    handle: 'github.com/chechucastro',
  },
  email: 'chechu@digitatis.com',
  address: 'Tercera Transversal Solanas N°3, 36780 A Guarda',
  country: 'Spain',
  nationality: 'Spanish',
}
