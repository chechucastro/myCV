<template>
  <div class="space-y-6">
    <RecommendationCard
      v-for="(rec, recIdx) in recommendations"
      :key="rec.name + '-' + rec.surname + '-' + recIdx"
      :recommendation="rec"
    />
  </div>
</template>

<script setup lang="ts">
import type { Recommendation } from '@/types'
import RecommendationCard from './RecommendationCard.vue'

interface Props {
  recommendations: Recommendation[]
}

defineProps<Props>()
</script>

