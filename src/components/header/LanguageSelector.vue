<template>
  <select
    name="language"
    id="language"
    class="cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:outline-none dark:text-white dark:hover:bg-neutral-800"
  >
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
  </select>
</template>

<script setup lang="ts">
// Single Responsibility: Language selection UI
// Can be extended with i18n integration in the future
</script>

