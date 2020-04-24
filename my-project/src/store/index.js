import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add (state, item) {
      state.count = item
    }
  },
  actions: {
    addSync (context, item) {
      setTimeout(() => {
        context.commit('add', item)
      }, 1000)
    }
  },
  getters: {
    initCount (state) {
      return 1
    }
  },
  modules: {}
})
