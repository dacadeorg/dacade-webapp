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
}

export const actions = {
  async findAll({ commit, dispatch, getters }, slug) {
    await dispatch('all')
    let data = getters.list
    data = data
      .filter((b) => b.community)
      .filter((b) => b.community.slug === slug)
    commit('setFilteredList', data)
  },
  async all({ commit }) {
    const { data } = await this.$api.get('referrals/list')
    commit('setList', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
}
