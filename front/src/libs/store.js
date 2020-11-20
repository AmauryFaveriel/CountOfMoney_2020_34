import Vue from 'vue';
import Vuex from 'vuex';

import axios from './axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: localStorage.getItem('status') || null,
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    auth_success(state, data) {
      state.status = 'logged';
      state.token = data.access_token;
      state.user = data.user;
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
    },
    logout(state) {
      state.status = null;
      state.token = null;
      state.user = null;
      axios.defaults.headers.common.Authorization = 'Bearer ';
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post('sessions', {
          session: {
            email: user.email,
            password: user.password,
          },
        }).then(({ data }) => {
          if (data.access_token === undefined) {
            localStorage.removeItem('token');
            reject();
          }
          localStorage.setItem('status', 'logged');
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          commit('auth_success', data);
          resolve();
        }).catch(() => reject());
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('status');
        commit('logout');
        resolve();
      });
    },
    update_user() {
      return new Promise((resolve, reject) => {
        axios
          .get(`users/${this.state.user.id}`)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.data));
            resolve();
          })
          .catch(() => reject());
      });
    },
  },
  getters: {
    isLoggedIn: (state) => state.token,
    authStatus: (state) => state.status,
  },
});
