const state = {
  username:'小明'
}

const mutations = {
  add (state, step) {
    state.username = step
  },
}

const actions = {
  addAsync(context){
    setTimeout(() => {
      context.commit('add', step)
    },100)
  }
}

const getters = {
  editUsername(state){
    return state.username = '小红'
  }
}

export default{
 state,
 mutations,
 actions,
 getters
}
