/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  filter: [],
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setFilter(state, payload) {
    state.filter = payload
  },
}

export const actions = {
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`)
    commit('setList', data)
  },
  async filterAll({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard?filter-by=all`)
    commit('setFilter', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  filter(state) {
    return state.filter
  },
}
