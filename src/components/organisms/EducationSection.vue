<template>
  <div class="space-y-6">
    <EducationCard
      v-for="(edu, eduIdx) in education"
      :key="eduIdx"
      :education="edu"
      :education-index="eduIdx"
    />
  </div>
</template>

<script setup lang="ts">
import type { Education } from '@/types'
import EducationCard from '@/components/molecules/EducationCard.vue'

interface Props {
  education: Education[]
}

defineProps<Props>()
</script>
