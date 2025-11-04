<template>
  <section
    class="rounded-xl transition-all duration-300 sm:p-2 dark:from-neutral-800 dark:to-neutral-800"
    aria-label="Company group"
  >
    <div class="space-y-6">
      <PositionCard
        v-for="(pos, pIdx) in props.company.positions"
        :key="(props.company.companyKey || 'company') + '-' + pIdx"
        :data="{
          position: pos,
          company: {
            name: companyName,
            logo: props.company.companyLogo,
            key: props.company.companyKey,
          },
          idx: pIdx,
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CompanyHistory } from '@/types'
import PositionCard from '@/components/molecules/PositionCard.vue'

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
