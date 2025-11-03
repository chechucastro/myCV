<template>
  <div class="space-y-6">
    <transition-group name="fade-slide" tag="div" class="space-y-6">
      <CompanyHistorySection
        v-for="(company, cIdx) in visibleCompanies"
        :key="(company.companyKey || 'company') + '-' + cIdx"
        :company="company"
      />
    </transition-group>
    <div v-if="hasMoreCompanies" class="flex justify-center pt-4">
      <BaseButton
        variant="outline"
        color="blue"
        size="md"
        button-type="button"
        :aria-label="showAll ? t('common.showLess') : t('common.showMore')"
        @click="toggleShowAll"
      >
        <span>{{ showAll ? t('common.showLess') : t('common.showMore') }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': showAll }"
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CompanyHistory } from '@/types'
import CompanyHistorySection from './CompanyHistorySection.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 4,
})

const { t, tm, locale } = useI18n()

/**
 * Build company history from translations (dates are now in translation files)
 * Reactive to locale changes by accessing locale.value
 */
const companyHistory = computed<CompanyHistory[]>(() => {
  // Access locale.value to make this computed reactive to locale changes
  void locale.value // Access to track reactivity, even if unused

  const companiesData = tm('articles.employment.companies')

  if (!companiesData || typeof companiesData !== 'object') {
    return []
  }

  return Object.keys(companiesData).map((companyKey) => {
    const company = (companiesData as Record<string, any>)[companyKey]
    const positions =
      company.positions?.map((pos: any) => {
        return {
          startDate: pos.startDate || '',
          endDate: pos.endDate,
        }
      }) || []

    return {
      companyKey,
      companyLogo: `/company-logos/${companyKey === 'prada-group' ? 'prada' : companyKey}.webp`,
      positions,
    }
  })
})
const showAll = ref<boolean>(false)

const hasMoreCompanies = computed<boolean>(() => {
  return companyHistory.value.length > props.initialCount
})

const visibleCompanies = computed<CompanyHistory[]>(() => {
  if (showAll.value || !hasMoreCompanies.value) {
    return companyHistory.value
  }
  return companyHistory.value.slice(0, props.initialCount)
})

const toggleShowAll = (): void => {
  showAll.value = !showAll.value
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-move {
  transition: transform 0.4s ease-out;
}
</style>
