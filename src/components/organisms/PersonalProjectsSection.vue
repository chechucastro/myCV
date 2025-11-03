<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <ProjectCard
      v-for="(project, projectIdx) in personalProjects"
      :key="projectIdx"
      :project="project"
      :project-index="projectIdx"
      class="h-full"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalProject } from '@/types'
import ProjectCard from '@/components/molecules/ProjectCard.vue'

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
    endDate: '2024-12-31',
  },
  {
    projectUrl: 'https://xemacon.com',
    githubUrl: 'https://github.com/chechucastro/xemacon',
    githubIsPrivate: true,
    startDate: '2014-01-01',
    endDate: '2024-12-31',
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
    endDate: '2010-03-31',
  },
]

const { tm, locale } = useI18n()

/**
 * Build personal projects from translations and metadata
 * Reactive to locale changes by accessing locale.value
 */
const personalProjects = computed<PersonalProject[]>(() => {
  // Access locale.value to make this computed reactive to locale changes
  void locale.value // Access to track reactivity, even if unused

  const items = tm('articles.personalProjects.items')

  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item: any, idx: number) => {
    const metadata = personalProjectsMetadata[idx] || {}
    return {
      projectKey: idx,
      projectUrl: metadata.projectUrl,
      githubUrl: metadata.githubUrl,
      githubIsPrivate: metadata.githubIsPrivate,
      startDate: metadata.startDate,
      endDate: metadata.endDate,
    }
  })
})
</script>
