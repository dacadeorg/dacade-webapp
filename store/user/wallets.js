/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  current: null,
  main: null,
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setList(state, payload) {
    const list = payload
    state.list = list
    state.main = list.length
      ? list.find((wallet) => wallet.main) || list[0]
      : null
  },
  clear(state, payload) {
    state.list = []
    state.current = null
    state.main = null
  },
}

export const actions = {
  async all({ commit }) {
    const { data } = await this.$api.get('wallets/list')
    commit('setList', data)
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
