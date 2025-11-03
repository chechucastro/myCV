<template>
  <section
    :id="hideHeading ? undefined : 'skills-section'"
    :aria-labelledby="hideHeading ? undefined : 'skills-heading'"
    :ref="hideHeading ? 'skillsSectionRef' : undefined"
    class="scroll-reveal mb-8"
  >
    <h2
      v-if="!hideHeading"
      id="skills-heading"
      class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      {{ t('sections.skills') }}
    </h2>

    <!-- Live region to announce skill progress updates for screen reader users -->
    <div id="skills-live" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <ul class="space-y-6">
      <li
        v-for="(skill, index) in visibleSkills"
        :key="skill.name"
        :aria-labelledby="'skill-name-' + (startIndex + index)"
        class="group"
        :class="{ 'additional-skill': index >= topSkillsCount }"
      >
        <div
          :id="'skill-name-' + (startIndex + index)"
          class="mb-3 text-sm font-semibold text-gray-700 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400"
        >
          {{ skill.name }}
        </div>

        <!-- Accessible progress element for assistive tech -->
        <progress
          class="sr-only"
          :value="skill.level"
          max="100"
          :aria-labelledby="'skill-name-' + (startIndex + index)"
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
            :data-skill-index="startIndex + index"
            style="left: 0%; transform: translateX(-50%)"
            aria-hidden="true"
          >
            <span
              class="text-[8px] leading-none text-purple-600 dark:text-purple-400"
              aria-hidden="true"
              >●</span
            >
          </div>
        </div>
      </li>
    </ul>

    <!-- Show More / Show Less button (only show if not in two-column mode) -->
    <div v-if="hasMoreSkills && !hideHeading" class="mt-6">
      <BaseButton
        variant="outline"
        color="purple"
        size="md"
        button-type="button"
        full-width
        :aria-expanded="showMore"
        :aria-controls="'additional-skills'"
        :aria-label="showMore ? t('common.showLess') : t('common.showMore')"
        @click="toggleShowMore"
      >
        <span>{{ showMore ? t('common.showLess') : t('common.showMore') }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': showMore }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Skill } from '@/types'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useAccessibility } from '@/composables/useAccessibility'
import { TOP_SKILLS_COUNT } from '@/config/constants'
import BaseButton from '@/components/atoms/BaseButton/BaseButton.vue'
import { skillsData } from '@/data/skills'

interface Props {
  hideHeading?: boolean
  skillsToDisplay?: Skill[]
  startIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  hideHeading: false,
  skillsToDisplay: undefined,
  startIndex: 0,
})

const { t } = useI18n()

const { observeElement } = useIntersectionObserver()
const { announceToLiveRegion } = useAccessibility()

const skillsSectionRef = ref<HTMLElement | null>(null)
const showMore = ref(false)
const topSkillsCount = TOP_SKILLS_COUNT

// Sort skills by level (descending) and split into top skills and the rest
const sortedSkills = computed(() => {
  // If skillsToDisplay is provided, just use those (already sorted by parent)
  if (props.skillsToDisplay) {
    return [...props.skillsToDisplay]
  }
  return [...skillsData].sort((a, b) => b.level - a.level)
})

const topSkills = computed(() => {
  return sortedSkills.value.slice(0, topSkillsCount)
})

const additionalSkills = computed(() => {
  return sortedSkills.value.slice(topSkillsCount)
})

const hasMoreSkills = computed(() => {
  return additionalSkills.value.length > 0
})

const visibleSkills = computed(() => {
  // If skillsToDisplay is provided (two-column mode), show all of them
  if (props.skillsToDisplay) {
    return sortedSkills.value
  }
  // Otherwise, use the show more/less logic
  return showMore.value ? sortedSkills.value : topSkills.value
})

const toggleShowMore = async () => {
  showMore.value = !showMore.value
  if (showMore.value) {
    // Wait for DOM update before animating
    await nextTick()
    animateAdditionalSkills()
  }
}

const animateAdditionalSkills = () => {
  additionalSkills.value.forEach((skill: Skill, i: number) => {
    window.setTimeout((): void => {
      const index = props.startIndex + topSkillsCount + i
      const arrow: HTMLElement | null = document.querySelector<HTMLElement>(
        `[data-skill-index="${index}"]`,
      )
      if (arrow) {
        arrow.style.left = `${skill.level}%`
      }
      if (!props.hideHeading) {
        announceToLiveRegion('skills-live', `${skill.name}: ${skill.level}%`)
      }
    }, i * 200)
  })
}

const animateSkills = (skillsToAnimate: Skill[], animationStartIndex: number = 0) => {
  skillsToAnimate.forEach((skill: Skill, i: number) => {
    window.setTimeout((): void => {
      const index = props.startIndex + animationStartIndex + i
      const arrow: HTMLElement | null = document.querySelector<HTMLElement>(
        `[data-skill-index="${index}"]`,
      )
      if (arrow) {
        arrow.style.left = `${skill.level}%`
      }
      if (!props.hideHeading) {
        announceToLiveRegion('skills-live', `${skill.name}: ${skill.level}%`)
      }
    }, i * 200)
  })
}

onMounted(() => {
  // Observe skills section to animate arrows only when visible
  if (!props.hideHeading) {
    observeElement(
      'skills-section',
      () => {
        // Animate top skills initially
        animateSkills(topSkills.value, 0)
      },
      { threshold: 0.2, rootMargin: '0px' },
      true,
    )
  } else {
    // If in two-column mode, use direct Intersection Observer on the ref element
    nextTick(() => {
      if (skillsSectionRef.value) {
        const observer = new IntersectionObserver(
          (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
              if (entry.isIntersecting) {
                // Animate skills when section becomes visible
                animateSkills(visibleSkills.value, 0)
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.2, rootMargin: '0px' },
        )
        observer.observe(skillsSectionRef.value)
      } else {
        // Fallback: animate after a delay if ref is not available
        setTimeout(() => {
          animateSkills(visibleSkills.value, 0)
        }, 200)
      }
    })
  }
})

// Watch for when additional skills are shown and animate them
watch(showMore, (newValue: boolean) => {
  if (newValue) {
    nextTick(() => {
      animateAdditionalSkills()
    })
  }
})

// Watch for skillsToDisplay prop changes (when show/hide is toggled in parent)
watch(
  () => props.skillsToDisplay?.length ?? 0,
  () => {
    if (props.hideHeading && props.skillsToDisplay && props.skillsToDisplay.length > 0) {
      // Re-animate when skills change (when show/hide is toggled)
      nextTick(() => {
        // Wait for DOM to update
        setTimeout(() => {
          animateSkills(visibleSkills.value, 0)
        }, 150)
      })
    }
  },
)
</script>

<style scoped>
.additional-skill {
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
