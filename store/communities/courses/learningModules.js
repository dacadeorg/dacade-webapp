/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  current: null,
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
    const { data } = await this.$api.get(`learning-modules/${id}`)
    commit('setCurrent', data)
  },
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`courses/${slug}/learning-modules`)
    commit('setList', data)
  },
  submitModuleAnswer({ commit }, { ref, course }) {
    return this.$api.put(`interactive-modules/answer`, {
      module: ref,
      course,
      score: 100,
    })
  },
  async checkAnswer({ commit }, ref) {
    const { data } = await this.$api.post(`interactive-modules/check-answer`, {
      module: ref,
    })
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
