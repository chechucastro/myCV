<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <ProjectCard
      v-for="(project, projectIdx) in personalProjects"
      :key="projectIdx"
      :project="project"
      :project-index="projectIdx"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalProject } from '@/types'
import ProjectCard from './ProjectCard.vue'

/**
 * Personal projects metadata (URLs and dates)
 */
const personalProjectsMetadata: Array<{
  projectUrl?: string
  githubUrl?: string
  startDate?: string
  endDate?: string
}> = [
  {
    projectUrl: 'https://example.com/project1',
    githubUrl: 'https://github.com/chechucastro/project1',
    startDate: '2023-01-01',
    endDate: '2023-06-30',
  },
  {
    projectUrl: 'https://example.com/project2',
    githubUrl: 'https://github.com/chechucastro/project2',
    startDate: '2022-05-01',
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
      startDate: metadata.startDate,
      endDate: metadata.endDate,
    }
  })
})
</script>

