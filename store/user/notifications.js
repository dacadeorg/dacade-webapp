/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { read } from 'gray-matter'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()

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
  ...vuexfireMutations,
}

export const actions = {
  async all({ commit }) {
    const { data } = await this.$api.get('notifications/list')
    commit('set', data.list)
    commit('setUnread', data.unread)
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
