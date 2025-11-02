<template>
  <section
    class="rounded-xl transition-all duration-300 sm:p-2 dark:from-neutral-800 dark:to-neutral-800"
    aria-label="Company group"
  >
    <div class="mb-6 flex items-center gap-4">
      <div
        v-if="props.company.companyLogo"
        class="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700 dark:bg-white"
      >
        <img
          :src="props.company.companyLogo"
          :alt="`${companyName} logo`"
          loading="lazy"
          width="64"
          height="64"
          class="h-full w-full object-contain"
        />
      </div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">
        {{ companyName }}
      </h3>
    </div>

    <div class="space-y-6">
      <PositionCard
        v-for="(pos, pIdx) in props.company.positions"
        :key="(props.company.companyKey || 'company') + '-' + pIdx"
        :position="pos"
        :company-key="props.company.companyKey"
        :position-index="pIdx"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CompanyHistory } from '@/types'
import PositionCard from './PositionCard.vue'

interface Props {
  company: CompanyHistory
}

const props = defineProps<Props>()
const { t } = useI18n()

const companyName = computed(() => {
  if (props.company.companyKey) {
    return t(`articles.employment.companies.${props.company.companyKey}.name`)
  }
  return ''
})
</script>
