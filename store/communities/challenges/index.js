/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  current: null,
  list: [],
  submission: null,
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setSubmission(state, payload) {
    state.submission = payload
  },
}

export const actions = {
  async find({ commit }, id) {
    const { data } = await this.$api.get(`challenges/${id}`)
    commit('setCurrent', data)
    commit('setSubmission', data.submission)
  },
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`/communities/${slug}/challenges`)
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
  submission(state) {
    return state.submission
  },
}
