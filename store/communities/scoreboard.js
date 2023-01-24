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
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`)
    commit('setList', data)
  },
  async filter({ commit }, { slug, filterBy }) {
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`, {
      params: {
        "filter-by": filterBy,
      }
    })
    commit('setList', data)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
}
