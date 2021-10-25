/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
}

export const actions = {
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
