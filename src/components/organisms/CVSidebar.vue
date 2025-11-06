<template>
  <div>
    <!-- Sidebar component - currently empty but kept for contactInfo exposure -->
  </div>
</template>

<script setup lang="ts">
import type { ContactInfo } from '@/types'
import { CONTACT_INFO } from '@/config/constants'

// Expose contactInfo for parent components
defineExpose({
  get contactInfo(): ContactInfo {
    return CONTACT_INFO
  },
})
</script>
