import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL = 'http://127.0.0.1:4000/api/';

axios.defaults.headers.common = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

Vue.use(VueAxios, axios);

export default axios;
