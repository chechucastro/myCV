
import type { Skill, Language, ContactInfo } from '@/types'
import SkillsSection from './SkillsSection.vue'
import LanguagesSection from './LanguagesSection.vue'
import DetailsSection from './DetailsSection.vue'

interface Props {
  skills: Skill[]
  languages: Language[]
  contactInfo: ContactInfo
}

defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
SkillsSection;
// @ts-ignore
LanguagesSection;
// @ts-ignore
DetailsSection;
{
{
{
{
// @ts-ignore
(skills);
}
{
// @ts-ignore
(languages);
}
{
// @ts-ignore
(contactInfo);
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
