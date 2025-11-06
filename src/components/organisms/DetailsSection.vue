<template>
  <div class="mx-auto space-y-8">
    <address class="not-italic">
      <!-- Social Links Section -->
      <div class="mb-8">
        <div class="mb-5 flex items-center gap-3">
          <div
            class="h-px flex-1 bg-linear-to-r from-transparent via-purple-500/30 to-transparent"
          ></div>
          <h3 class="text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-gray-300">
            {{ t('details.social') }}
          </h3>
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          ></div>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <!-- LinkedIn -->
          <ButtonDetails
            :label="t('details.linkedin')"
            :value="contactInfo.linkedin.handle"
            :href="contactInfo.linkedin.url"
            :aria-label="t('aria.linkedinProfile')"
            icon-bg-class="bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-lg shadow-blue-500/30"
            icon-fill="white"
            :icon-path="ICONS.linkedin"
            :show-arrow="false"
            hover-color="blue"
          />

          <!-- GitHub -->
          <ButtonDetails
            :label="t('details.github')"
            :value="contactInfo.github.handle"
            :href="contactInfo.github.url"
            :aria-label="t('aria.githubProfile')"
            icon-bg-class="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-white shadow-lg shadow-gray-500/30"
            icon-classes="text-white dark:text-gray-900"
            :icon-path="ICONS.github"
            hover-color="gray"
            :show-arrow="false"
          />
        </div>
      </div>

      <!-- Contact Section -->
      <div class="mb-8">
        <div class="mb-5 flex items-center gap-3">
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          ></div>
          <h3 class="text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-gray-300">
            {{ t('details.contact') }}
          </h3>
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          ></div>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ButtonDetails
            :label="t('details.email')"
            :value="contactInfo.email"
            :href="`mailto:${contactInfo.email}`"
            :aria-label="t('aria.sendEmail')"
            icon-bg-class="bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 shadow-lg shadow-purple-500/30"
            :icon-path="ICONS.email"
            alignment="start"
            hover-color="purple"
          />
          <ButtonDetails
            :label="t('details.hireMe')"
            :value="t('details.hireMe')"
            href="https://www.malt.es/profile/chechucastro"
            :aria-label="t('aria.hireMeProfile')"
            icon-bg-class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg shadow-red-500/20"
            hover-color="purple"
            :show-arrow="false"
          >
            <template #icon>
              <img
                src="/company-logos/malt.svg"
                alt="Malt logo"
                class="h-6 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              />
            </template>
          </ButtonDetails>
        </div>
      </div>

      <!-- Download CV Section -->
      <div class="mb-8">
        <div class="mb-5 flex items-center gap-3">
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
          ></div>
          <h3 class="text-xs font-bold tracking-widest text-gray-600 uppercase dark:text-gray-300">
            {{ t('details.downloads') }}
          </h3>
          <div
            class="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
          ></div>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ButtonDetails
            :label="t('details.downloadCVFull')"
            :value="t('details.downloadCVFull')"
            href="/docs/Chechu-Castro-CV-EN-2025-full.pdf"
            :aria-label="t('aria.downloadCVFull')"
            icon-bg-class="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 shadow-lg shadow-indigo-500/30"
            :icon-path="ICONS.download"
            hover-color="purple"
            :show-arrow="false"
            download="Chechu-Castro-CV-EN-2025-full.pdf"
          />
          <ButtonDetails
            :label="t('details.downloadCVLight')"
            :value="t('details.downloadCVLight')"
            href="/docs/Chechu-Castro-CV-EN-2025-light.pdf"
            :aria-label="t('aria.downloadCVLight')"
            icon-bg-class="bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-500 shadow-lg shadow-teal-500/30"
            :icon-path="ICONS.download"
            hover-color="blue"
            :show-arrow="false"
            download="Chechu-Castro-CV-EN-2025-light.pdf"
          />
        </div>
      </div>
    </address>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ButtonDetails from '@/components/molecules/ButtonDetails.vue'
import { CONTACT_INFO } from '@/config/constants'

const contactInfo = CONTACT_INFO
const { t } = useI18n()

defineExpose({ contactInfo })

const ICONS = {
  linkedin:
    'M4.983 3.5A1.5 1.5 0 1 1 3.5 5a1.5 1.5 0 0 1 1.483-1.5zM2 8.982h3.967V21H2V8.982zM9 8.982h3.81v1.648h.053c.53-1.002 1.828-2.06 3.762-2.06 4.024 0 4.764 2.65 4.764 6.093V21h-3.967v-5.367c0-1.28-.027-2.924-1.782-2.924-1.784 0-2.058 1.395-2.058 2.835V21H9V8.982z',
  github:
    'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  email:
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
} as const
</script>
