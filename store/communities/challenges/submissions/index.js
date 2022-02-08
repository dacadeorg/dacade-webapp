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
    const { data } = await this.$api.get(`submissions/${id}`, {
      params: {
        relations: ['challenge', 'evaluations'],
      },
    })
    commit('setCurrent', data)
  },
  show({ commit, state }, id) {
    if (!state.list.length) return
    const current = state.list.find((submission) => submission.id === id)
    commit('setCurrent', current)
  },
  async all({ commit, state }, { challengeId, startAfter }) {
    const { data } = await this.$api.get(
      `challenges/${challengeId}/submissions`,
      {
        params: { start_after: startAfter },
      }
    )
    const list = []
    if (startAfter) {
      list.push(...(state.list || []))
    }
    list.push(...(data || []))
    commit('setList', list)
    return data
  },
  async create({ commit }, { text, link, challengeId }) {
    const { data } = await this.$api.post('submissions/create', {
      challenge_id: challengeId,
      text,
      link,
    })
    this.commit('communities/challenges/setSubmission', data)
    return data
  },
  async findWithRelations({ commit }, id) {
    const { data } = await this.$api.get(`submissions/${id}`, {
      params: {
        relations: ['challenge', 'evaluations', 'course', 'community'],
      },
    })
    commit('setCurrent', data)
    this.commit('communities/setCurrent', data.community)
    this.commit('communities/courses/setCurrent', data.course)
    this.commit('communities/challenges/setCurrent', data.challenge)
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
