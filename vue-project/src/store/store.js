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
        name: '首页',
        index: 0
      },
      {
        url: '/catalog/note',
        name: '个人博客日记',
        index: 4
      },
      {
        url: '/catalog/website',
        name: '博客网站制作',
        index: 5
      },
      {
        url: '/catalog/experience',
        name: '网站设计心得',
        index: 6
      },
      {
        url: '/catalog/excellent',
        name: '优秀个人博客',
        index: 7
      },
      {
        url: '/catalog/about',
        name: '关于我们',
        index: 8
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
