// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/store.js'
import animate from 'animate.css'
import i18n from './i18n/i18n.js'
import axios from 'axios'
import qs from 'qs'

// 设置语言
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$notify = ElementUI.Notification
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.use(animate)
Vue.use(ElementUI)
Vue.config.productionTip = false
// 超时时间
axios.defaults.timeout = 5000
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // 根据需要对数据进行转换处理：比如需要统一加上token值那么可以做如下处理
  if (!config.params) {
    config.params = {}
  }
  // 添加token
  config.params.accessToken = localStorage.getItem('accessToken')
  // 如果是post请求,用qs方法处理
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, function (error) {
  // Do something with request error
  console.log(error)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  return response
}, function (error) {
  // Do something with response error
  // 根据返回状态拦截
  switch (error.response.status) {
    case 200:
      break
    case 400:
      ElementUI.Message.error(`拒绝访问(403)`)
      break
    case 401:
      ElementUI.Message.error(`拒绝访问(403)`)
      break
    case 403:
      ElementUI.Message.error('拒绝访问(403)')
      break
    case 404:
      ElementUI.Message.error('请求出错(404)')
      break
    case 408:
      ElementUI.Message.error('请求超时(408')
      break
    case 500:
      ElementUI.Message.error('服务器错误(500)')
      break
    case 501:
      ElementUI.Message.error('服务未实现(501)')
      break
    case 502:
      ElementUI.Message.error('网络错误(502)')
      break
    case 503:
      ElementUI.Message.error('服务不可用(503)')
      break
    case 504:
      ElementUI.Message.error('网络超时(504)')
      break
    case 505:
      ElementUI.Message.error('HTTP版本不受支持(505)')
      break
    default:
      ElementUI.Message.error(`连接出错`)
  }
  return Promise.reject(error)
})
// console.log(axios)
// axios.defaults.baseURL = URL
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
