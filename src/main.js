import Vue from 'vue';
import router from './routes';
import store from './store';
import '@/styles/index.scss';

import App from './App.vue';

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
