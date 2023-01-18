/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  filteredList: [],
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setFilteredList(state, payload) {
    state.filteredList = payload
  },
}

export const actions = {
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`)
    commit('setList', data)
  },
    async filter({ commit }, { slug, filterBy }) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`, {
      params: {
        "filter-by": filterBy,
      }
    })
    commit('setFilteredList', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  filteredList(state) {
    return state.filteredList
  },
}
