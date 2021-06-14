/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

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
  async findAll({ commit }, slug) {
    let { data } = await this.$apiClient('bounties-list')
    console.log(data)
    commit('setList', data)
    data = data.filter((b) => b.slug === slug)
    console.log(data)
    commit('setFilteredList', data)
  },
  async all({ commit }) {
    const { data } = await this.$apiClient('bounties-list')
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
