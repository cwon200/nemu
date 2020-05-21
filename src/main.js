import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueCookies from 'vue-cookies';
import SlideUpDown from 'vue-slide-up-down';
import axios from 'axios';
import router from './router';

import Config from './config/Config.js';

import App from './App';
import store from './store';
import directive from './directive';
// import { i18n } from './config/i18n';
// import VueGtag from 'vue-gtag';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueCookies);
Vue.directive('numberWithCommas', directive);
Vue.component('slide-up-down', SlideUpDown);
// Vue.use(VueGtag, { config: { id: Config.GA.ID } });

function runApplication() {
  // axios 기본 셋팅
  axios.defaults.headers.head['content-type'] = 'application/json';
  axios.defaults.withCredentials = true; // 쿠키 자동 전송

  new Vue({
    el: '#app',
    // i18n,
    store,
    router,
    components: { App },
    template: '<App/>',
  });
}

// 배포후에 어플리케이션 로드에 필수 요소를 체크하기 위한 로직
if (Config.APPLICATION_PHASE === 'LOCAL') {
  runApplication();
} else {
  window.addEventListener('load', () => {
    runApplication();
  });
}
