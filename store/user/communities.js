/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  reputation: 0,
  current: null,
  feedbacks: [],
  submissions: [],
})

export const mutations = {
  setCurrent(state, payload) {
    this.commit('ui/setColors', {
      ...payload.colors,
    })
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setFeedbacks(state, payload) {
    state.feedbacks = payload
  },
  setSubmissions(state, payload) {
    state.submissions = payload
  },
  setReputation(state, payload) {
    state.reputation = payload
  },
}

export const actions = {
  async find({ commit }, slug) {
    const { data } = await this.$apiClient('profile-community', {
      slug,
    })
    console.log(data)
    commit('setCurrent', data.community)
    commit('setFeedbacks', data.feedbacks)
    commit('setSubmissions', data.submissions)
    commit('setReputation', data.reputation)
  },
  async all({ commit }) {
    const { data } = await this.$apiClient('profile-communities')
    commit('setList', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  current(state) {
    return state.current
  },
  feedbacks(state) {
    return state.feedbacks
  },
  submissions(state) {
    return state.submissions
  },
  reputation(state) {
    return state.reputation
  },
}