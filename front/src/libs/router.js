import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Crypto from '../components/CryptoPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home, name: 'home' },
    // Page test cryptocurrencies
    {
      path: '/crypto',
      component: Crypto,
      name: 'crypto',
    },
  ],
});
