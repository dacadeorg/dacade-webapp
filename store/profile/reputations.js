/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  clear(state, payload) {
    state.list = []
  },
}

export const actions = {
  async all({ commit }, username) {
    try {
      await commit('clear')
      const { data } = await this.$api.get(`profile/${username}/reputations`)
      commit('setList', data)
    } catch (e) {
      commit('clear')
      console.log(e)
    }
  },
}

export const getters = {
  list(state) {
    return state.list
  },
}
