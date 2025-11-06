<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <CertificationCard
      v-for="(cert, certIdx) in certifications"
      :key="cert.title + '-' + certIdx"
      :certification="cert"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Certification } from '@/types'
import CertificationCard from '@/components/molecules/CertificationCard.vue'

const { tm, locale } = useI18n()

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

  return (items as Array<Record<string, unknown>>).map(
    (cert): Certification => ({
      title: cert.title as string,
      issuedBy: cert.issuedBy as string,
      issuedDate: cert.issuedDate as string,
      certificateImage: cert.certificateImage as string,
      certificateLink: cert.certificateLink as string,
    }),
  )
})
</script>
