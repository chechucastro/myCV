<template>
  <div class="flex items-center gap-2 sm:gap-4" :class="isScrolled ? 'py-1.5 sm:py-2' : 'sm:py-3'">
    <img
      v-if="isScrolled"
      :src="profileImage"
      :alt="name"
      loading="lazy"
      width="48"
      height="48"
      class="h-10 w-10 rounded-full border-2 border-gray-200 shadow-md sm:h-12 sm:w-12 dark:border-neutral-700"
    />
    <div class="flex flex-col">
      <h2 class="text-sm font-bold sm:text-base">
        <span
          class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
        >
          {{ name }}
        </span>
      </h2>
      <p class="text-xs text-gray-600 sm:text-sm dark:text-white">
        {{ jobTitle }}
      </p>
      <p
        v-if="!isScrolled && showNameInNav"
        class="text-xs text-gray-500 sm:text-sm dark:text-gray-300"
      >
        {{ techStack }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  jobTitle: string
  techStack: string
  profileImage: string
  isScrolled: boolean
  showNameInNav: boolean
}

withDefaults(defineProps<Props>(), {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
})
</script>
