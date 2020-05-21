import Vue from 'vue';
import Router from 'vue-router';
// import store from '../store';
// import Config from '@/config/Config';
// import { i18n } from '@/config/i18n';
// import gtagLogger from '@/util/gtagLogger';

import { routerHistory, writeHistory } from 'vue-router-back-button';
import MainL from '@/layouts/main/MainL';

Vue.use(Router);
Vue.use(routerHistory);

const router = new Router({
  // mode: isLocal() ? 'hash' : 'history',
  // base: '/spambot',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainL,
      meta: { isMobile: true },
    },
  ],

  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  // 로그인 체크
  next();
});
router.afterEach(writeHistory);

export default router;
