/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()

export const state = () => ({
  notifications: [],
  count: 0,
})

export const mutations = {
  clear(state) {
    state.notifications = []
  },
  set(state, payload) {
    state.notifications = payload
    state.count = payload.length
  },
  ...vuexfireMutations,
}

export const actions = {
  async all({ commit }) {
    const { data } = await this.$api.get('notifications/list')
    commit('set', data)
  },
  markAsRead({ commit }, payload) {
    db.ref(`notifications/${payload.userId}/${payload.id}/notificationRead`)
      .set(true)
      .then(() => {
        this.commit('setJobDone', true)
        this.commit('setBusy', false)
      })
      .catch((error) => {
        this.commit('setBusy', false)
        this.commit('setError', error)
      })
  },
  add({ commit }, payload) {
    db.ref(`notifications/${payload.userId}`)
      .push(payload)
      .then(() => {
        console.log('success user notification added')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
}

export const getters = {
  get(state) {
    return state.notifications
  },
  count(state) {
    return state.count
  },
}
