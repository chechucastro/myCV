<template>
  <aside
    class="scroll-reveal order-1 h-fit sticky lg:w-80"
    aria-label="Sidebar with contact and skills"
  >
    <div
      class="rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 sm:p-6 lg:p-6 lg:shadow-2xl dark:border dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-2xl dark:shadow-black/30"
    >
      <div class="relative">
        <SkillsSection />
        <LanguagesSection />
        <DetailsSection ref="detailsSectionRef" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ContactInfo } from '@/types'
import SkillsSection from './SkillsSection.vue'
import LanguagesSection from './LanguagesSection.vue'
import DetailsSection from './DetailsSection.vue'

const detailsSectionRef = ref<InstanceType<typeof DetailsSection> | null>(null)

// Expose contactInfo for parent components
defineExpose({
  get contactInfo(): ContactInfo | undefined {
    return detailsSectionRef.value?.contactInfo
  },
})
</script>

