// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
fastclick.attach(document.body)
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false
Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
