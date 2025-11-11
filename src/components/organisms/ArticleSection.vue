<template>
  <section
    :id="
      section.title === 'Profile'
        ? 'profile-section'
        : section.title === 'Languages'
          ? 'languages-section'
          : section.title === 'Details'
            ? 'details-section'
            : undefined
    "
    :aria-labelledby="'section-title-' + sectionIndex"
    role="region"
    class="scroll-reveal relative mb-8 bg-white p-4 transition-all duration-300 last:mb-0 hover:shadow-xl sm:rounded-2xl sm:shadow-lg lg:p-6 dark:border dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-lg dark:shadow-black/20"
  >
    <h2
      :id="'section-title-' + sectionIndex"
      class="relative mb-8 text-3xl font-bold text-gray-900 after:absolute after:left-0 after:mt-3 after:block after:h-1 after:w-16 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      {{ translatedTitle }}
    </h2>

    <!-- If Profile section, render body -->
    <ProfileSection
      v-if="section.title === 'Profile' && !section.companyHistory"
      :body="translatedBody || section.body || ''"
    />

    <!-- If Core Competencies section, render body and skills -->
    <template v-if="section.title === 'Core Competencies' && !section.companyHistory">
      <ProfileSection :body="translatedBody || section.body || ''" />

      <!-- Editors/IDE section -->
      <div class="mt-8">
        <h2
          class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
        >
          {{ t('articles.editorsIDE.title') }}
        </h2>
        <ProfileSection :body="t('articles.editorsIDE.body')" />
      </div>

      <!-- Skills in two columns on larger screens -->
      <div class="mt-8">
        <h2
          class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
        >
          {{ t('sections.otherSkills') }}
        </h2>
        <div class="flex flex-col sm:flex-row sm:gap-6">
          <div class="flex-1 sm:w-1/2">
            <SkillsSection
              :hide-heading="true"
              :skills-to-display="firstColumnSkills"
              :start-index="0"
            />
          </div>
          <transition name="skills-fade">
            <div
              v-if="showMoreSkills || firstColumnSkills.length <= SKILLS_PER_COLUMN_DEFAULT"
              key="second-column"
              class="flex-1 sm:w-1/2"
            >
              <SkillsSection
                :hide-heading="true"
                :skills-to-display="secondColumnSkills"
                :start-index="firstColumnSkills.length"
              />
            </div>
          </transition>
        </div>

        <!-- Show More / Show Less button -->
        <transition name="button-fade">
          <div v-if="hasMoreSkillsToShow" key="button-container" class="mt-6 flex justify-center">
            <BaseButton
              variant="outline"
              color="purple"
              size="md"
              button-type="button"
              centered
              :aria-expanded="showMoreSkills"
              :aria-label="showMoreSkills ? t('common.showLess') : t('common.showMore')"
              @click="toggleShowMoreSkills"
            >
              <span>{{ showMoreSkills ? t('common.showLess') : t('common.showMore') }}</span>
              <svg
                class="h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': showMoreSkills }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </BaseButton>
          </div>
        </transition>
      </div>
    </template>

    <!-- If Languages section, render it -->
    <LanguagesSection v-if="section.title === 'Languages'" />

    <!-- If companyHistory is provided, render grouped entries -->
    <EmploymentHistorySection v-if="section.title === 'Employment history'" />

    <!-- If education is provided, render it -->
    <EducationSection v-if="section.education" :education="section.education" />

    <!-- If certifications are provided, render them -->
    <CertificationsSection v-if="section.title === 'Licenses & certifications'" />

    <!-- If personal projects are provided, render them -->
    <PersonalProjectsSection v-if="section.title === 'Personal projects'" />

    <!-- Recommendations -->
    <RecommendationsSection v-if="section.title === 'Recommendations'" />

    <!-- Details -->
    <DetailsSection v-if="section.title === 'Details'" />
  </section>
</template>

<style scoped>
/* Skills transition effects */
.skills-fade-enter-active {
  transition: all 0.4s ease;
}

.skills-fade-leave-active {
  transition: all 0.3s ease;
}

.skills-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.skills-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Button fade transition */
.button-fade-enter-active,
.button-fade-leave-active {
  transition: opacity 0.3s ease;
}

.button-fade-enter-from,
.button-fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ArticleSection as ArticleSectionType } from '@/types'
import ProfileSection from '@/components/molecules/ProfileSection.vue'
import SkillsSection from './SkillsSection.vue'
import LanguagesSection from './LanguagesSection.vue'
import EmploymentHistorySection from './EmploymentHistorySection.vue'
import EducationSection from './EducationSection.vue'
import CertificationsSection from './CertificationsSection.vue'
import PersonalProjectsSection from './PersonalProjectsSection.vue'
import RecommendationsSection from './RecommendationsSection.vue'
import DetailsSection from './DetailsSection.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import { trackSectionToggle } from '@/composables/useGoogleAnalytics'
import { skillsData } from '@/data/skills'

// Sort skills by level (descending)
const sortedSkills = computed(() => {
  return [...skillsData].sort((a, b) => b.level - a.level)
})

const showMoreSkills = ref(false)
const SKILLS_PER_COLUMN_DEFAULT = 2

// Determine what skills to show in first column
const firstColumnSkills = computed(() => {
  if (showMoreSkills.value) {
    // Show all - split into two columns
    const midpoint = Math.ceil(sortedSkills.value.length / 2)
    return sortedSkills.value.slice(0, midpoint)
  }
  // Show only first 2 skills
  return sortedSkills.value.slice(0, SKILLS_PER_COLUMN_DEFAULT)
})

// Determine what skills to show in second column
const secondColumnSkills = computed(() => {
  if (showMoreSkills.value) {
    // Show all - split into two columns
    const midpoint = Math.ceil(sortedSkills.value.length / 2)
    return sortedSkills.value.slice(midpoint)
  }
  // Show next 2 skills (skills 2-4)
  return sortedSkills.value.slice(SKILLS_PER_COLUMN_DEFAULT, SKILLS_PER_COLUMN_DEFAULT * 2)
})

// Check if there are more skills to show
const hasMoreSkillsToShow = computed(() => {
  return sortedSkills.value.length > SKILLS_PER_COLUMN_DEFAULT * 2
})

// Toggle show more/less
const toggleShowMoreSkills = () => {
  const action = showMoreSkills.value ? 'show_less' : 'show_more'
  showMoreSkills.value = !showMoreSkills.value

  // Track section toggle
  trackSectionToggle('core_competencies_skills', action)
}

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
    Languages: 'sections.languages',
    'Employment history': 'articles.employment.title',
    Education: 'articles.education.title',
    'Licenses & certifications': 'articles.certifications.title',
    'Personal projects': 'articles.personalProjects.title',
    Recommendations: 'articles.recommendations.title',
    Details: 'sections.details',
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
