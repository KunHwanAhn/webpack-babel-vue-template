import Vue from 'vue';
import '@/styles/index.scss';

import store from './store';
import router from './routes';
import plugins from './plugins';

import App from './App.vue';

new Vue({
  store,
  router,
  ...plugins,
  render: (h) => h(App),
}).$mount('#app');
