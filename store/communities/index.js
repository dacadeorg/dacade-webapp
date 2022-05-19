/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  count: 0,
  content: null,
  current: null,
  loading : false
})

export const mutations = {
  setCurrent(state, payload) {
    this.commit('ui/setColors', {
      ...payload.colors,
    })
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setContent(state, payload) {
    state.content = payload
  },
}

export const actions = {
  async find({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}`)
    commit('setCurrent', data)
  },
  async all({ commit }) {
    commit('setLoading', true)
    const { data } = await this.$api.get('communities')
    
    commit('setList', data)
    // setTimeout(() => {
    //   console.log("Inside async")
    // }, 3000);

    // commit('setLoading', false)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  current(state) {
    return state.current
  },
  content(state) {
    return state.content
  },
  loading(state) {
    return state.loading
  },
}
