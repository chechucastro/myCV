
import type { Certification } from '@/types'
import CertificationCard from './CertificationCard.vue'

interface Props {
  certifications: Certification[]
}

defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
// @ts-ignore
CertificationCard;
{
// @ts-ignore
for (let cert of certifications) {
// @ts-ignore
let certIdx = {} as any;{
// @ts-ignore
(cert.title + '-' + certIdx);
// @ts-ignore
(cert);
}
}
}
};
return { };
},
});
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_DefinePropsToOptions<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('vue').PropType<T[K]>, required: true } };
