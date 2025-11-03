
import type { Education } from '@/types'
import EducationCard from './EducationCard.vue'

interface Props {
  education: Education[]
}

defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
EducationCard;
{
// @ts-ignore
for (let edu of education) {
// @ts-ignore
let eduIdx = {} as any;{
// @ts-ignore
(eduIdx);
// @ts-ignore
(edu);
// @ts-ignore
(eduIdx);
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
