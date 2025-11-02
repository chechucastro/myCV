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
import type { PersonalProject } from '@/types'
import ProjectCard from './ProjectCard.vue'

interface Props {
  personalProjects: PersonalProject[]
}

defineProps<Props>()
</script>

