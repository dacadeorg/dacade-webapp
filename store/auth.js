/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import auth from '@/lib/auth'

export const actions = {
  signUp ({ dispatch }, payload) {
    dispatch('setBusy', true)
    dispatch('clearError')
    return new Promise((resolve, reject) => {
      auth
        .signUp(payload)
        .then((user) => {
          dispatch('setJobDone', true)
          dispatch('setBusy', false)
          resolve(user)
        })
        .catch((error) => {
          dispatch('setBusy', false)
          dispatch('setError', error)
          reject(user)
        })
    })
  },

  login ({ dispatch }, payload) {
    dispatch('setBusy', true)
    dispatch('clearError')
    return new Promise((resolve, reject) => {
      auth
        .login(payload)
        .then((response) => {
          dispatch('setJobDone', true)
          dispatch('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          dispatch('setBusy', false)
          dispatch('setError', error)
          reject(error)
        })
    })
  },
  passwordResetRequest ({ dispatch }, payload) {
    dispatch('setBusy', true)
    dispatch('clearError')
    return new Promise((resolve, reject) => {
      auth
        .passwordResetRequest(payload.email)
        .then((response) => {
          dispatch('setJobDone', true)
          dispatch('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          dispatch('setBusy', false)
          dispatch('setError', error)
          reject(error)
        })
    })
  },
  logout ({ dispatch }) {
    firebase.auth().signOut()
    this.dispatch('setUser', null)
  },
  createVerificationRequest ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .verify(payload)
        .then((response) => {
          dispatch('setJobDone', true)
          dispatch('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          dispatch('setBusy', false)
          dispatch('setError', error)
          reject(error)
        })
    })
  }
}

// export const mutations = {
//   setUser (state, payload) {
//     state.user = payload
//   },
//   ...vuexfireMutations
// }
// export const getters = {
//   user (state) {
//     return state.user
//   }
// }
