/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  notifications: [],
  count: 0,
  unread: 0,
})

export const mutations = {
  clear(state) {
    state.notifications = []
  },
  set(state, payload) {
    state.notifications = payload
    state.count = payload.length
  },
  setUnread(state, payload) {
    state.unread = payload
  },
}

export const actions = {
  async all({ commit }) {
    try {
      const { data } = await this.$api.get('notifications/list')
      await commit('clear')
      commit('set', data.list)
      commit('setUnread', data.unread)
    } catch (e) {
      console.log(e)
      commit('clear')
    }
  },
  async read({ dispatch }, payload) {
    await this.$api.post('notifications/mark-as-read')
    return dispatch('all')
  },
}

export const getters = {
  get(state) {
    return state.notifications
  },
  count(state) {
    return state.count
  },
  unread(state) {
    return state.unread
  },
}
