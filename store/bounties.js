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
  async findAll({ commit, dispatch, getters }, slug) {
    await dispatch('all')
    let data = getters.list
    data = data.filter((b) => b.slug === slug)
    commit('setFilteredList', data)
  },
  async all({ commit }) {
    const { data } = await this.$api.get('bounties')
    commit('setList', data)
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
