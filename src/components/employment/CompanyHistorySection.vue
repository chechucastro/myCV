<template>
  <section
    class="rounded-xl transition-all duration-300 hover:shadow-md sm:p-2 dark:border dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-800"
    aria-label="Company group"
  >
    <h3 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">
      {{ company.company }}
    </h3>

    <div class="space-y-6">
      <PositionCard
        v-for="(pos, pIdx) in company.positions"
        :key="company.company + '-' + pos.position + '-' + pIdx"
        :position="pos"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CompanyHistory } from '@/types'
import PositionCard from './PositionCard.vue'

interface Props {
  company: CompanyHistory
}

defineProps<Props>()
</script>

