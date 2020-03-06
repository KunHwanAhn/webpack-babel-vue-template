import Vue from 'vue';
import VueRouter from 'vue-router';

import HelloWorld from '@/views/HelloWorld.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HelloWorld,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
