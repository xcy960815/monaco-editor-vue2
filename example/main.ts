import Vue from 'vue';
import App from './App.vue';
import MonacoEditorVue2 from 'monaco-editor-vue2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(MonacoEditorVue2);
new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
});
