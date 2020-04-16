import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入login 模块
// import login from "./login"

export default new Vuex.Store({
  state: {
    count: 0,
    nav: [
      {
        url: '/catalog/home',
        name: '首页'
      },
      {
        url: '/catalog/login',
        name: '登录页'
      },
      {
        url: '/catalog/list',
        name: '列表'
      },
      {
        url: '/catalog/detail',
        name: '详情'
      }
    ]
  },
  mutations: {
    // 不要在mutations里面执行异步函数add(当前state,参数)
    add (state, step) {
      state.count += step
    },
    add1 (state) {
      state.count++
    },
    sub (state, step) {
      state.count -= step
    },
    setNavlist (state, data) {
      state.nav.push(data)
    }
  },
  // actions里面的方法只能通过mutations里面的函数改变
  // actions里面的函数自带参数context有一个方法commit('方法','参数')
  actions: {
    addAsybc (context, step) {
      setTimeout(() => {
        context.commit('add', step)
      }, 1000)
    }
  },
  // 不会改变state里面的值的状态,只是形成新的状态
  getters: {
    showNum (state) {
      return 10
    }
  },
  modules: {}
})
