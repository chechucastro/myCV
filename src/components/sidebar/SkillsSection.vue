<template>
  <section id="skills-section" aria-labelledby="skills-heading" class="scroll-reveal mb-8">
    <h2
      id="skills-heading"
      class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      Skills
    </h2>

    <!-- Live region to announce skill progress updates for screen reader users -->
    <div id="skills-live" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <ul class="space-y-6">
      <li
        v-for="(skill, index) in skills"
        :key="skill.name"
        :aria-labelledby="'skill-name-' + index"
        class="group"
      >
        <div
          :id="'skill-name-' + index"
          class="mb-3 text-sm font-semibold text-gray-700 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
        >
          {{ skill.name }}
        </div>

        <!-- Accessible progress element for assistive tech -->
        <progress
          class="sr-only"
          :value="skill.level"
          max="100"
          :aria-labelledby="'skill-name-' + index"
          :aria-valuemin="0"
          :aria-valuemax="100"
          :aria-valuenow="skill.level"
        >
          {{ skill.level }}%
        </progress>

        <!-- Visual progress bar (decorative) -->
        <div
          class="group/progress relative h-3 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-neutral-800"
          role="presentation"
        >
          <div
            class="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
            :style="{
              background:
                'linear-gradient(to right, #3b82f6 0%, #22c55e 30%, #22c55e 31%, #f97316 49%, #f97316 65%, #ef4444 70%, #ef4444 71%, #ef4444 100%)',
              transform: `scaleX(${skill.level / 100})`,
              transformOrigin: 'left',
            }"
          ></div>
          <!-- Decorative moving marker (hidden from AT) -->
          <div
            class="skill-arrow absolute z-30 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-md transition-all duration-1000 ease-out dark:bg-neutral-800"
            :data-skill-index="index"
            style="left: 0%; transform: translateX(-50%)"
            aria-hidden="true"
          >
            <span class="text-[8px] leading-none text-blue-600 dark:text-blue-400" aria-hidden="true"
              >●</span
            >
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { Skill } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()

onMounted(() => {
  // Observe skills section to animate arrows only when visible
  observeElement(
    'skills-section',
    () => {
      // Skills marker animation + announcements
      props.skills.forEach((skill: Skill, i: number) => {
        window.setTimeout((): void => {
          const arrow: HTMLElement | null = document.querySelector<HTMLElement>(
            `[data-skill-index="${i}"]`,
          )
          if (arrow) {
            arrow.style.left = `${skill.level}%`
          }
          announceToLiveRegion('skills-live', `${skill.name}: ${skill.level}%`)
        }, i * 200)
      })
    },
    { threshold: 0.2, rootMargin: '0px' },
    true,
  )
})
</script>

