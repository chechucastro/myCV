
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalProject } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  project: PersonalProject
  projectIndex?: number
}

const props = defineProps<Props>()
const { t } = useI18n()
const { formatDate } = useFormatters()

const projectKey = computed(() => {
  return props.project.projectKey !== undefined ? props.project.projectKey : props.projectIndex
})

const translatedTitle = computed(() => {
  if (projectKey.value !== undefined) {
    return t(`articles.personalProjects.items.${projectKey.value}.title`)
  }
  return ''
})

const translatedDescription = computed(() => {
  if (projectKey.value !== undefined) {
    const desc = t(`articles.personalProjects.items.${projectKey.value}.description`, '')
    return desc || ''
  }
  return ''
})

const translatedTechStack = computed(() => {
  if (projectKey.value !== undefined) {
    const tech = t(`articles.personalProjects.items.${projectKey.value}.techStack`, '')
    return tech || ''
  }
  return ''
})

const hasDates = computed(() => {
  return !!(props.project.startDate || props.project.endDate)
})

const hasLinks = computed(() => {
  return !!(props.project.projectUrl || props.project.githubUrl)
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
BaseCard;
// @ts-ignore
BaseButton;
{
{
{
// @ts-ignore
{  translatedTitle  };
}
// @ts-ignore
if (hasDates) {
{
{
{
}
}
// @ts-ignore
if (project.startDate) {
{
// @ts-ignore
(project.startDate);
// @ts-ignore
{ 
          formatDate(project.startDate)
         };
}
}
// @ts-ignore
if (project.startDate && project.endDate) {
{
}
}
// @ts-ignore
if (project.endDate) {
{
// @ts-ignore
(project.endDate);
// @ts-ignore
{ 
          formatDate(project.endDate)
         };
}
}
// @ts-ignore
else if (project.startDate && !project.endDate) {
{
// @ts-ignore
{  t('employment.present')  };
}
}
}
}
}
// @ts-ignore
if (translatedDescription) {
{
// @ts-ignore
{  translatedDescription  };
}
}
// @ts-ignore
if (translatedTechStack) {
{
{
// @ts-ignore
{  t('employment.techStack')  };
}
{
// @ts-ignore
{  translatedTechStack  };
}
}
}
// @ts-ignore
if (hasLinks) {
{
// @ts-ignore
if (project.projectUrl) {
{
// @ts-ignore
(project.projectUrl);
// @ts-ignore
(`View ${translatedTitle} project (opens in new tab)`);
{
{
}
}
}
}
// @ts-ignore
if (project.githubUrl) {
{
// @ts-ignore
(project.githubUrl);
{
{
}
}
}
}
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
