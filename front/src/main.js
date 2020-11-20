import Vue from 'vue';

import './libs/axios';
import './libs/notifications';

import router from './libs/router';
import store from './libs/store';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
