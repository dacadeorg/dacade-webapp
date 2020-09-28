/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  userNotifications: null
})

export const mutations = {
  set (state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}

export const actions = {
  fetch: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userNotifications', db.ref('notifications').child(uid))
  }),
  markAsRead ({ commit }, payload) {
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
  add ({ commit }, payload) {
    db.ref(`notifications/${payload.userId}`)
      .push(payload)
      .then(() => {
        console.log('success user notification added')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

export const getters = {
  get (state) {
    return state.userNotifications
  }
}
