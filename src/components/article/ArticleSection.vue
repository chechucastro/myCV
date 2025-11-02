<template>
  <section
    :id="section.title === 'Profile' ? 'profile-section' : undefined"
    :aria-labelledby="'section-title-' + sectionIndex"
    role="region"
    class="scroll-reveal relative mb-8 bg-white transition-all duration-300 last:mb-0 hover:shadow-xl sm:rounded-2xl sm:p-4 sm:p-6 sm:shadow-lg lg:p-6 dark:border dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-lg dark:shadow-black/20"
  >
    <h2
      :id="'section-title-' + sectionIndex"
      class="relative mb-8 text-3xl font-bold text-gray-900 after:absolute after:left-0 after:mt-3 after:block after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      {{ translatedTitle }}
    </h2>

    <!-- If a simple body exists, render it -->
    <ProfileSection
      v-if="section.body && !section.companyHistory"
      :body="translatedBody || section.body"
    />

    <!-- If companyHistory is provided, render grouped entries -->
    <EmploymentHistorySection
      v-if="section.companyHistory"
      :company-history="section.companyHistory"
    />

    <!-- If education is provided, render it -->
    <EducationSection v-if="section.education" :education="section.education" />

    <!-- If certifications are provided, render them -->
    <CertificationsSection v-if="section.certifications" :certifications="section.certifications" />

    <!-- If personal projects are provided, render them -->
    <PersonalProjectsSection
      v-if="section.personalProjects"
      :personal-projects="section.personalProjects"
    />

    <!-- Recommendations -->
    <RecommendationsSection
      v-if="section.recommendations"
      :recommendations="section.recommendations"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ArticleSection as ArticleSectionType } from '@/types'
import ProfileSection from './ProfileSection.vue'
import EmploymentHistorySection from '../employment/EmploymentHistorySection.vue'
import EducationSection from '../education/EducationSection.vue'
import CertificationsSection from '../certifications/CertificationsSection.vue'
import PersonalProjectsSection from '../projects/PersonalProjectsSection.vue'
import RecommendationsSection from '../recommendations/RecommendationsSection.vue'

interface Props {
  section: ArticleSectionType
  sectionIndex: number
}

const props = defineProps<Props>()
const { t } = useI18n()

const translatedTitle = computed(() => {
  const titleKeyMap: Record<string, string> = {
    Profile: 'articles.profile.title',
    'Core Competencies': 'articles.coreCompetencies.title',
    'Employment history': 'articles.employment.title',
    Education: 'articles.education.title',
    'Licenses & certifications': 'articles.certifications.title',
    'Personal projects': 'articles.personalProjects.title',
    Recommendations: 'articles.recommendations.title',
  }

  const translationKey = titleKeyMap[props.section.title]
  if (translationKey) {
    return t(translationKey)
  }
  return props.section.title
})

const translatedBody = computed(() => {
  if (props.section.title === 'Profile') {
    return t('articles.profile.body')
  }
  if (props.section.title === 'Core Competencies') {
    return t('articles.coreCompetencies.body')
  }
  return null
})
</script>
