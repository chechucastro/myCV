<template>
  <article class="scroll-reveal flex-1 lg:order-2" aria-label="Main article content">
    <ArticleSectionComponent
      v-for="(sec, i) in articleSections"
      :key="i"
      :section="sec"
      :section-index="i"
    />
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ArticleSection } from '@/types'
import ArticleSectionComponent from './ArticleSection.vue'

const { tm } = useI18n()

/**
 * Build article sections from translation files
 */
const articleSections = computed<ArticleSection[]>(() => {
  const sections: ArticleSection[] = []

  // Profile section
  sections.push({
    title: 'Profile',
    body: '', // Body is read from translations in ArticleSection component
  })

  // Core Competencies section
  sections.push({
    title: 'Core Competencies',
    body: '', // Body is read from translations in ArticleSection component
  })

  // Employment history section - EmploymentHistorySection now builds this itself
  sections.push({
    title: 'Employment history',
    companyHistory: [], // Empty array - EmploymentHistorySection builds from translations
  })

  // Education section
  sections.push({
    title: 'Education',
    education: [
      {
        educationKey: 0,
        startDate: '1994-01-01',
        endDate: '1998-12-31',
      },
    ],
  })

  // Certifications section - CertificationsSection builds from translations
  sections.push({
    title: 'Licenses & certifications',
  })

  // Personal projects section - PersonalProjectsSection now builds this itself
  sections.push({
    title: 'Personal projects',
    personalProjects: [], // Empty array - PersonalProjectsSection builds from translations
  })

  // Recommendations section - RecommendationsSection now builds this itself
  sections.push({
    title: 'Recommendations',
    recommendations: [], // Empty array - RecommendationsSection builds from translations
  })

  return sections
})
</script>
