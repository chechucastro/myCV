<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <CertificationCard
      v-for="(cert, certIdx) in certifications"
      :key="cert.title + '-' + certIdx"
      :certification="cert"
    />
  </div>
</template>

<script setup lang="ts">
import type { Certification } from '@/types'
import CertificationCard from './CertificationCard.vue'

interface Props {
  certifications: Certification[]
}

defineProps<Props>()
</script>

