/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  current: null,
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
  async all({ commit, state }, { startAfter } = {}) {
    const { data } = await this.$api.get('referrals/tracking', {
      params: { start_after: startAfter },
    })
    const list = []
    if (startAfter) {
      list.push(...(state.list || []))
    }
    list.push(...(data || []))
    if (!startAfter) {
      commit('clear')
    }
    commit('setList', list)
    return data
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
