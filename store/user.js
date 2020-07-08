/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  user: null,
  usersData: null
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}
export const getters = {
  user(state) {
    return state.user
  }
}

export const action = {
  loginUser({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  logOut({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  passwordResetRequest({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    firebase.auth().sendPasswordResetEmail(payload.email)
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  }
}
