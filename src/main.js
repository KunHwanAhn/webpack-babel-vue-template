import Vue from 'vue';
import store from './store';
import router from './routes';
import plugins from './plugins';
import '@/styles/index.scss';

import App from './App.vue';

new Vue({
  store,
  router,
  ...plugins,
  render: (h) => h(App),
}).$mount('#app');
