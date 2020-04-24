import 'lib-flexible'
import Vue from 'vue';
import App from './App';
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
import { router } from './router';

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
