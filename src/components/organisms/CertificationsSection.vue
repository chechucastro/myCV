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
  
  const items = tm('articles.certifications.items')
  
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((cert: any) => ({
    title: cert.title,
    issuedBy: cert.issuedBy,
    issuedDate: cert.issuedDate,
    certificateImage: cert.certificateImage,
    certificateLink: cert.certificateLink,
  }))
})
</script>

