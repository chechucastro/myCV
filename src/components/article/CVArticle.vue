<template>
  <article class="scroll-reveal flex-1 lg:order-2" aria-label="Main article content">
    <ArticleSectionComponent
      v-for="(sec, i) in sections"
      :key="i"
      :section="sec"
      :section-index="i"
    />
  </article>
</template>

<script setup lang="ts">
import type { ArticleSection } from '@/types'
import ArticleSectionComponent from './ArticleSection.vue'

interface Props {
  sections: ArticleSection[]
}

defineProps<Props>()
</script>

