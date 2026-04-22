<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <CertificationCard
      v-for="(cert, certIdx) in visibleCertifications"
      :key="cert.title + '-' + certIdx"
      :certification="cert"
    />
  </div>
  <div v-if="hasCertificationToggle" class="mt-6 flex justify-center">
    <BaseButton
      variant="outline"
      color="purple"
      size="md"
      button-type="button"
      centered
      :aria-label="isExpanded ? t('common.showLess') : t('common.showMore')"
      :aria-expanded="isExpanded"
      @click="toggleCertifications"
    >
      {{ isExpanded ? t('common.showLess') : t('common.showMore') }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Certification } from '@/types'
import CertificationCard from '@/components/molecules/CertificationCard.vue'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'

const { tm, locale, t } = useI18n()
const DEFAULT_VISIBLE_CERTIFICATIONS = 2
const isExpanded = ref(false)

/**
 * Build certifications from translations
 * Reactive to locale changes by accessing locale.value
 */
const certifications = computed<Certification[]>(() => {
  // Access locale.value to make this computed reactive to locale changes
  void locale.value // Access to track reactivity, even if unused

  const items = tm('articles.certifications.items') as unknown

  if (!Array.isArray(items)) {
    return []
  }

  const mappedCertifications = (items as Array<Record<string, unknown>>).map(
    (cert): Certification => ({
      title: cert.title as string,
      issuedBy: cert.issuedBy as string,
      issuedDate: cert.issuedDate as string,
      certificateImage: cert.certificateImage as string,
      certificateLink: cert.certificateLink as string,
    }),
  )

  return mappedCertifications.sort((a, b) => {
    return new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime()
  })
})

const visibleCertifications = computed(() => {
  if (isExpanded.value) {
    return certifications.value
  }

  return certifications.value.slice(0, DEFAULT_VISIBLE_CERTIFICATIONS)
})

const hasCertificationToggle = computed(() => {
  return certifications.value.length > DEFAULT_VISIBLE_CERTIFICATIONS
})

const toggleCertifications = (): void => {
  isExpanded.value = !isExpanded.value
}
</script>
