/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

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
    const { data } = await this.$apiClient('bounties-list')
    commit('setList', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
}
