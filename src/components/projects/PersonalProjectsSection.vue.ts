
import type { PersonalProject } from '@/types'
import ProjectCard from './ProjectCard.vue'

interface Props {
  personalProjects: PersonalProject[]
}

defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
ProjectCard;
{
// @ts-ignore
for (let project of personalProjects) {
// @ts-ignore
let projectIdx = {} as any;{
// @ts-ignore
(projectIdx);
// @ts-ignore
(project);
// @ts-ignore
(projectIdx);
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
