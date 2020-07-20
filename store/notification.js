/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  setUserNotificationSeen({ commit }, payload) {
    db.ref(`notifications/${payload.userId}/${payload.id}/notificationRead`).set(true)
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  addUserNotification({ commit }, payload) {
    db.ref(`notifications/${payload.userId}`).push(payload)
      .then(() => {
        console.log('success user notification added')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
})
export const mutations = {
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setBusy(state, payload) {
    state.busy = payload
  },
  setJobDone(state, payload) {
    state.jobDone = payload
  },
  setForwardRoute(state, payload) {
    state.forwardRoute = payload
  },
  // setUserWalletAddresses(state, payload) {
  //   state.userWalletAddresses = payload
  // },
  ...vuexfireMutations
}
