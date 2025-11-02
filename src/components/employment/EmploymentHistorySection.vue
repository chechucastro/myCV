<template>
  <div class="space-y-6">
    <CompanyHistorySection
      v-for="(company, cIdx) in companyHistory"
      :key="(company.companyKey || 'company') + '-' + cIdx"
      :company="company"
    />
  </div>
</template>

<script setup lang="ts">
import type { CompanyHistory } from '@/types'
import CompanyHistorySection from './CompanyHistorySection.vue'

interface Props {
  companyHistory: CompanyHistory[]
}

defineProps<Props>()
</script>

