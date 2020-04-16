import axios from 'axios'
import router from '../router/index'
import qs from 'qs'
import './url.js'
// 创建axios实例
const service = axios.create({
  timeout: 10000 // 请求超时
})

// request拦截器
service.interceptors.request.use(config => {
  // 根据需要对数据进行转换处理：比如需要统一加上token值那么可以做如下处理
  if (!config.params) {
    config.params = {}
  }
  config.params.accessToken = localStorage.getItem('accessToken')
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // 根据需要对返回数据进行处理：根据前后端约定进行处理（比如用户未登录或权限过期时请求返回的处理）
  const res = response.data
  if (!res || res.code === -1) {
    // 权限过期跳转到登录页面
    window.location.href = '' // 登录页链接
  }
  return response
}, error => {
  if (!error || !error.response) {
    // 跳转500
    router.replace({
      path: '/'
    })
  }
  // 检查状态
  switch (error.response.status) {
    case 402:
      // 清除token信息
      alert('登录过期，请重新登录')
      // 清除token信息
      localStorage.setItem('accessToken', '')
      // permissionUtil.logout()
      return error
    case 404:
      // 跳转404
      router.replace({
        path: '/404'
      })
      break
  }
  return Promise.reject(error)
})

export default service
