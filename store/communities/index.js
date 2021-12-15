/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  count: 0,
  content: null,
  current: null,
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
    const { data } = await this.$api.get('communities')
    commit('setList', data)
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
}
