/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  current: null,
  list: [],
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
    const { data } = await this.$apiClient('feedbacks-show', {
      id,
    })
    commit('setCurrent', data)
  },
  async all({ commit }, submissionId) {
    const { data } = await this.$apiClient('feedbacks-list', {
      submission_id: submissionId,
    })
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
