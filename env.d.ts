/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
// Vue SFC type support for script setup
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // Allow any properties from script setup to be accessed in template
    [key: string]: any
  }
}
