
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ArticleSection as ArticleSectionType } from '@/types'
import ProfileSection from './ProfileSection.vue'
import EmploymentHistorySection from '../employment/EmploymentHistorySection.vue'
import EducationSection from '../education/EducationSection.vue'
import CertificationsSection from '../certifications/CertificationsSection.vue'
import PersonalProjectsSection from '../projects/PersonalProjectsSection.vue'
import RecommendationsSection from '../recommendations/RecommendationsSection.vue'

interface Props {
  section: ArticleSectionType
  sectionIndex: number
}

const props = defineProps<Props>()
const { t } = useI18n()

const translatedTitle = computed(() => {
  const titleKeyMap: Record<string, string> = {
    Profile: 'articles.profile.title',
    'Core Competencies': 'articles.coreCompetencies.title',
    'Employment history': 'articles.employment.title',
    Education: 'articles.education.title',
    'Licenses & certifications': 'articles.certifications.title',
    'Personal projects': 'articles.personalProjects.title',
    Recommendations: 'articles.recommendations.title',
  }

  const translationKey = titleKeyMap[props.section.title]
  if (translationKey) {
    return t(translationKey)
  }
  return props.section.title
})

const translatedBody = computed(() => {
  if (props.section.title === 'Profile') {
    return t('articles.profile.body')
  }
  if (props.section.title === 'Core Competencies') {
    return t('articles.coreCompetencies.body')
  }
  return null
})
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
ProfileSection;
// @ts-ignore
EmploymentHistorySection;
// @ts-ignore
EducationSection;
// @ts-ignore
CertificationsSection;
// @ts-ignore
PersonalProjectsSection;
// @ts-ignore
RecommendationsSection;
{
// @ts-ignore
(section.title === 'Profile' ? 'profile-section' : undefined);
// @ts-ignore
('section-title-' + sectionIndex);
{
// @ts-ignore
('section-title-' + sectionIndex);
// @ts-ignore
{  translatedTitle  };
}
// @ts-ignore
if (section.body && !section.companyHistory) {
{
// @ts-ignore
(translatedBody || section.body);
}
}
// @ts-ignore
if (section.companyHistory) {
{
// @ts-ignore
(section.companyHistory);
}
}
// @ts-ignore
if (section.education) {
{
// @ts-ignore
(section.education);
}
}
// @ts-ignore
if (section.certifications) {
{
// @ts-ignore
(section.certifications);
}
}
// @ts-ignore
if (section.personalProjects) {
{
// @ts-ignore
(section.personalProjects);
}
}
// @ts-ignore
if (section.recommendations) {
{
// @ts-ignore
(section.recommendations);
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
