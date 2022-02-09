/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  count: 0,
  current: null,
  menus: [],
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setContent(state, payload) {
    state.content = payload
  },
  setNavigation(state, payload) {
    const { list } = payload
    state.menus = list
  },
}

export const actions = {
  async find({ commit }, slug) {
    const { data } = await this.$api.get(`courses/${slug}`)
    commit('setCurrent', data)
    this.dispatch('communities/navigation/init')
  },
  async all({ commit }, slug) {
    const { data } = await this.$api.get(`communities/${slug}/courses`)
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
  navigation(state) {
    return state.menus
  },
}
