/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// import { all } from "core-js/fn/promise"

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
    state.current = []
  },
}

export const actions = {
  async find({ commit }, { id }) {
    const { data } = await this.$api.get(
      `certificates/${id}}`
    )
    commit('setCurrent', data)
  },
  // async all({ commit }, username) {
  //   if (!username) return
  //   // const { data } = await this.$api.get(`certificates?username=${username}`)
  //   const { data } = await this.$api.get(`certificate/:id`)
  //   commit('setList', data)
  // },
  async all({ commit }) {
    try {
      const { data } = await this.$api.get(`certificates`)
      await commit('clear')
      commit('setList', data)
    } catch (e) {
      console.log(e)
      commit('clear')
    }
  },
  async update({ dispatch }) {
    await dispatch('all')
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
