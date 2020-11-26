import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import CryptoList from '../components/CryptoList.vue';
import CryptoPage from '../components/CryptoPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home, name: 'home' },
    // Page test cryptocurrencies list
    {
      path: '/cryptolist',
      component: CryptoList,
      name: 'cryptolist',
    },
    {
      path: '/crypto/:symbol',
      component: CryptoPage,
      name: 'cryptopage',
      props: true,
    },
  ],
});
