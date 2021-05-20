/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  current: null,
  list: [],
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
}

export const actions = {
  async find({ commit }, id) {
    const { data } = await this.$apiClient('challenges-show', {
      id,
    })
    commit('setCurrent', data)
  },
  async all({ commit }, slug) {
    const { data } = await this.$apiClient('challenges-list', {
      slug,
    })
    commit('setList', data)
  },
}

export const getters = {
  current(state) {
    return state.current
  },
  list(state) {
    return state.list
  },
}
