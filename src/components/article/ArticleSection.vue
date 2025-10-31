<template>
  <section
    :id="section.title === 'Profile' ? 'profile-section' : undefined"
    :aria-labelledby="'section-title-' + sectionIndex"
    role="region"
    class="scroll-reveal relative mb-8 bg-white p-4 transition-all duration-300 last:mb-0 hover:shadow-xl sm:rounded-2xl sm:p-6 sm:shadow-lg lg:p-8 dark:border dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-lg dark:shadow-black/20"
  >
    <h2
      :id="'section-title-' + sectionIndex"
      class="relative mb-8 text-3xl font-bold text-gray-900 after:absolute after:left-0 after:mt-3 after:block after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      {{ section.title }}
    </h2>

    <!-- If a simple body exists, render it -->
    <ProfileSection v-if="section.body && !section.companyHistory" :body="section.body" />

    <!-- If companyHistory is provided, render grouped entries -->
    <EmploymentHistorySection v-if="section.companyHistory" :company-history="section.companyHistory" />

    <!-- If certifications are provided, render them -->
    <CertificationsSection v-if="section.certifications" :certifications="section.certifications" />

    <!-- Recommendations -->
    <RecommendationsSection v-if="section.recommendations" :recommendations="section.recommendations" />
  </section>
</template>

<script setup lang="ts">
import type { ArticleSection as ArticleSectionType } from '@/types'
import ProfileSection from './ProfileSection.vue'
import EmploymentHistorySection from '../employment/EmploymentHistorySection.vue'
import CertificationsSection from '../certifications/CertificationsSection.vue'
import RecommendationsSection from '../recommendations/RecommendationsSection.vue'

interface Props {
  section: ArticleSectionType
  sectionIndex: number
}

defineProps<Props>()
</script>

