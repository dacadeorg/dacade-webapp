/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setList(state, payload) {
    const list = payload
    state.list = list
  },
  clear(state) {
    state.list = []
  },
}

export const actions = {
  async all({ commit }) {
    const { data } = await this.$api.get('payouts')
    commit('setList', data)
  },

  async create({ dispatch }, payload) {
    await this.$api.post(`payouts/create`, payload)
    dispatch('all')
    this.dispatch('user/wallets/all')
  },
}

export const getters = {
  current(state) {
    return state.current
  },
  main(state) {
    return state.main
  },
  list(state) {
    return state.list
  },
}
