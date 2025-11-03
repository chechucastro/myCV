<template>
  <section aria-labelledby="details-heading" class="scroll-reveal">
    <h2
      id="details-heading"
      class="relative mb-6 text-2xl font-bold text-gray-900 after:absolute after:left-0 after:mt-2 after:block after:h-1 after:w-12 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:content-[''] dark:text-white"
    >
      {{ t('sections.details') }}
    </h2>
    <div class="mx-auto space-y-6">
      <address class="not-italic">
        <!-- Social Links Section -->
        <div class="mb-6">
          <h3
            class="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
          >
            {{ t('details.social') }}
          </h3>
          <div class="space-y-3">
            <!-- LinkedIn -->
            <ButtonDetails
              :label="t('details.linkedin')"
              :value="contactInfo.linkedin.handle"
              :href="contactInfo.linkedin.url"
              :aria-label="t('aria.linkedinProfile')"
              icon-bg-class="bg-[#0A66C2]"
              icon-fill="white"
              :icon-path="ICONS.linkedin"
              :show-arrow="false"
            />

            <!-- GitHub -->
            <ButtonDetails
              :label="t('details.github')"
              :value="contactInfo.github.handle"
              :href="contactInfo.github.url"
              :aria-label="t('aria.githubProfile')"
              icon-bg-class="bg-gray-900 dark:bg-white"
              icon-classes="text-white dark:text-gray-900"
              :icon-path="ICONS.github"
              hover-color="purple"
              :show-arrow="false"
            />
          </div>
        </div>

        <!-- Contact Section -->
        <div class="mb-6">
          <h3
            class="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
          >
            {{ t('details.contact') }}
          </h3>
          <ButtonDetails
            :label="t('details.email')"
            :value="contactInfo.email"
            :href="`mailto:${contactInfo.email}`"
            :aria-label="t('aria.sendEmail')"
            icon-bg-class="bg-gradient-to-br from-blue-500 to-purple-600"
            :icon-path="ICONS.email"
            alignment="start"
          />
        </div>

        <!-- Address Section -->
        <div class="mb-6">
          <h3
            class="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
          >
            {{ t('details.location') }}
          </h3>
          <ButtonDetails
            :label="t('details.address')"
            :value="contactInfo.address"
            :secondary-value="contactInfo.country"
            icon-bg-class="bg-gradient-to-br from-red-500 to-pink-600"
            :icon-path="ICONS.location"
            :is-clickable="false"
          />
        </div>

        <!-- Nationality Section -->
        <div>
          <h3
            class="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
          >
            {{ t('details.nationality') }}
          </h3>
          <ButtonDetails
            :label="t('details.country')"
            :value="contactInfo.nationality"
            icon-bg-class="bg-gradient-to-br from-green-500 to-emerald-600"
            :icon-path="ICONS.globe"
            :is-clickable="false"
          />
        </div>
      </address>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ContactInfo } from '@/types'
import ButtonDetails from '@/components/molecules/ButtonDetails.vue'

/**
 * Contact information
 */
const contactInfo: ContactInfo = {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.webp',
  linkedin: {
    url: 'https://www.linkedin.com/in/chechucastro',
    handle: 'linkedin.com/in/chechucastro',
  },
  github: {
    url: 'https://github.com/chechucastro',
    handle: 'github.com/chechucastro',
  },
  email: 'chechu@digitatis.com',
  address: 'Tercera Transversal Solanas N°3, 36780 A Guarda',
  country: 'Spain',
  nationality: 'Spanish',
}

const { t } = useI18n()

// Expose contactInfo for parent components that need it
defineExpose({ contactInfo })

/**
 * Icon SVG path constants
 */
const ICONS = {
  linkedin:
    'M4.983 3.5A1.5 1.5 0 1 1 3.5 5a1.5 1.5 0 0 1 1.483-1.5zM2 8.982h3.967V21H2V8.982zM9 8.982h3.81v1.648h.053c.53-1.002 1.828-2.06 3.762-2.06 4.024 0 4.764 2.65 4.764 6.093V21h-3.967v-5.367c0-1.28-.027-2.924-1.782-2.924-1.784 0-2.058 1.395-2.058 2.835V21H9V8.982z',
  github:
    'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  email:
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  location:
    'M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
  globe:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
} as const
</script>
