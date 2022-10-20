/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  current: [],
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },

  setList(state, payload) {
    state.list = payload
  },

  clear(state, payload) {
    state.list = []
    state.current = null
  },
}

export const actions = {
  async find({ commit }, { id }) {
    const { data } = await this.$api.get(`certificates/${id}`)
    commit('setCurrent', data)
  },
  async all({ commit, getters }, username) {
    commit('clear')
    if (!username) return
    const { data } = await this.$api.get(`certificates?username=${username}`)
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
