import MonacoEditorVue2 from './monaco-editor-vue2.vue';
import type { VueConstructor } from 'vue';
export { MonacoEditorVue2 };
declare const _default: {
  install: (
    Vue: VueConstructor<
      MonacoEditorVue2<
        Record<string, any>,
        Record<string, any>,
        never,
        never,
        (
          event: string,
          ...args: any[]
        ) => MonacoEditorVue2<Record<string, any>, Record<string, any>, never, never, any>
      >
    >,
  ) => void;
};
export default _default;
