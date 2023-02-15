/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  loading: false,
})

export const mutations = {
  setList(state, payload) {
    state.list = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async all({ commit }, slug) {
    commit('setLoading', true)
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`)
    commit('setList', data)
    commit('setLoading', false)
  },

  async filter({ commit }, { slug, filterBy }) {
      commit('setLoading', true)
    const { data } = await this.$api.get(`communities/${slug}/scoreboard`, {
      params: {
        "filter-by": filterBy,
      }
    })
    commit('setList', data)
    commit('setLoading', false)
  },
  sort({ commit, state }, { sortBy }) {
    const sortedList = [...state.list].sort((a, b) => {
      return b[sortBy] - a[sortBy]
      }
    )
    console.log(sortedList);
    commit('setList', sortedList)
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  loading(state) {
    return state.loading
  }
}
