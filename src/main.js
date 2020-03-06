import Vue from 'vue';
import router from './routes';
import '@/styles/index.scss';

import App from './App.vue';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
