
import type { Certification } from '@/types'
import { useFormatters } from '@/composables/useFormatters'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  certification: Certification
}

const props = defineProps<Props>()
const { formatDate } = useFormatters()
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
{
// @ts-ignore
(props.certification.certificateImage);
// @ts-ignore
(`${props.certification.title} certificate`);
}
}
}
{
{
// @ts-ignore
{  props.certification.title  };
}
{
{
{
{
}
}
{
{
}
{
// @ts-ignore
{  props.certification.issuedBy  };
}
}
}
{
{
{
}
}
{
{
}
{
{
// @ts-ignore
(props.certification.issuedDate);
// @ts-ignore
{ 
                formatDate(props.certification.issuedDate)
               };
}
}
}
}
}
{
{
// @ts-ignore
(props.certification.certificateLink);
// @ts-ignore
(true);
// @ts-ignore
(`View ${props.certification.title} certificate (opens in new tab)`);
{
{
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
