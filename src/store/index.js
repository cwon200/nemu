import Vue from 'vue';
import Vuex from 'vuex';
import ES6Promise from 'es6-promise';

import env from './modules/env';

ES6Promise.polyfill();
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    env,
  },
});

export default store;
