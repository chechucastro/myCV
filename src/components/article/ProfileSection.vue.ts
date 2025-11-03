
interface Props {
  body: string | string[]
}

defineProps<Props>()
export default (await import('vue')).defineComponent({
props: ({} as __VLS_DefinePropsToOptions<Props>),
setup() {
() => {
{
// @ts-ignore
if (typeof body === 'string') {
{
// @ts-ignore
{  body  };
}
}
// @ts-ignore
else {
{
// @ts-ignore
for (let para of body) {
// @ts-ignore
let idx = {} as any;{
// @ts-ignore
(idx);
// @ts-ignore
{  para  };
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
