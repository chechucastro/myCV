<template>
  <div>
    <TransitionGroup name="project" tag="div" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ProjectCard
        v-for="(project, projectIdx) in visibleProjects"
        :key="project.projectKey ?? projectIdx"
        :project="project"
        :project-index="projectIdx"
        class="project-item h-full"
      />
    </TransitionGroup>
    <div v-if="personalProjects.length > 2" class="mt-6 flex justify-center">
      <BaseButton
        variant="outline"
        color="purple"
        size="md"
        button-type="button"
        :aria-expanded="allProjectsShown"
        :aria-label="allProjectsShown ? t('common.showLess') : t('common.showMore')"
        @click="toggleShowMore"
      >
        <span>{{ allProjectsShown ? t('common.showLess') : t('common.showMore') }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': allProjectsShown }"
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalProject } from '@/types'
import ProjectCard from '@/components/molecules/ProjectCard.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

const INITIAL_PROJECTS_COUNT = 2
const PROJECTS_INCREMENT = 2

const visibleProjectsCount = ref(INITIAL_PROJECTS_COUNT)

/**
 * Personal projects metadata (URLs and dates)
 */
const personalProjectsMetadata: Array<{
  projectUrl?: string
  githubUrl?: string
  githubIsPrivate?: boolean
  startDate?: string
  endDate?: string
}> = [
  {
    projectUrl: 'https://dogs-shelter.pages.dev/',
    githubUrl: 'https://github.com/chechucastro/dogs-shelter',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
  },
  {
    projectUrl: window.location.origin,
    githubUrl: 'https://github.com/chechucastro/myCV',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
  },
  {
    githubUrl: 'https://github.com/chechucastro/temper',
    startDate: '2022-03-01',
    endDate: '2022-03-31',
  },
  {
    projectUrl: 'https://nemonon.com',
    githubUrl: 'https://github.com/chechucastro/nemonon',
    githubIsPrivate: true,
    startDate: '2015-09-01',
  },
  {
    projectUrl: 'https://xemacon.com',
    githubUrl: 'https://github.com/chechucastro/xemacon',
    githubIsPrivate: true,
    startDate: '2014-01-01',
  },
  {
    githubUrl: 'https://github.com/chechucastro/CookieLaw',
    startDate: '2013-01-01',
    endDate: '2013-01-31',
  },
  {
    projectUrl: 'https://maurolomba.com',
    githubUrl: 'https://github.com/chechucastro/maurolomba',
    githubIsPrivate: true,
    startDate: '2010-01-01',
  },
]

const { tm, locale, t } = useI18n()

/**
 * Build personal projects from translations and metadata
 * Reactive to locale changes by accessing locale.value
 */
const personalProjects = computed<PersonalProject[]>(() => {
  // Access locale.value to make this computed reactive to locale changes
  // Ensure reactivity on locale
  void locale.value

  // Get translated items, fall back to empty array if result is not an array
  const itemsRaw = tm('articles.personalProjects.items') as unknown
  const items = Array.isArray(itemsRaw) ? (itemsRaw as Record<string, unknown>[]) : []

  // Return early if no items found
  if (items.length === 0) {
    return []
  }

  const result: PersonalProject[] = []
  for (let idx = 0; idx < items.length; idx++) {
    const metadata = personalProjectsMetadata[idx] || {}
    result.push({
      projectKey: idx,
      projectUrl: metadata.projectUrl,
      githubUrl: metadata.githubUrl,
      githubIsPrivate: metadata.githubIsPrivate,
      startDate: metadata.startDate,
      endDate: metadata.endDate,
    })
  }
  return result
})

/**
 * Projects visible based on current count
 */
const visibleProjects = computed(() => {
  return personalProjects.value.slice(0, visibleProjectsCount.value)
})

/**
 * Check if all projects are shown
 */
const allProjectsShown = computed(() => {
  return visibleProjectsCount.value >= personalProjects.value.length
})

/**
 * Toggle show more/less functionality
 */
const toggleShowMore = () => {
  if (allProjectsShown.value) {
    // Show less - reset to initial count
    visibleProjectsCount.value = INITIAL_PROJECTS_COUNT
  } else {
    // Show more - add increment, but cap at total projects
    visibleProjectsCount.value = Math.min(
      visibleProjectsCount.value + PROJECTS_INCREMENT,
      personalProjects.value.length,
    )
  }
}
</script>

<style scoped>
.project-item {
  transition: all 0.3s ease-in-out;
}

.project-enter-active,
.project-leave-active {
  transition: all 0.3s ease-in-out;
}

.project-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.project-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.project-enter-to,
.project-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.project-move {
  transition: transform 0.3s ease-in-out;
}
</style>
