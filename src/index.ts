import MonacoEditorVue2 from './monaco-editor-vue2.vue';
import type { VueConstructor } from 'vue';

const install = (Vue: VueConstructor) => {
  Vue.component('monaco-editor-vue2', MonacoEditorVue2);
};

export { MonacoEditorVue2 };

export default {
  install,
};
