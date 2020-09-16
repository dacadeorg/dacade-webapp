/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import auth from '@/lib/auth'

export const actions = {
  signUp ({ dispatch }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .signUp(payload)
        .then((user) => {
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
          // this.$ga.event({
          //   eventCategory: 'registration',
          //   eventAction: `registration userId: ${user.uid}`
          // })
          resolve(user)
        })
        .catch((error) => {
          this.commit('setBusy', false)
          this.commit('setError', error)
          reject(error)
        })
    })
  },

  login ({ dispatch }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .login(payload)
        .then((response) => {
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          this.commit('setBusy', false)
          this.commit('setError', error)
          reject(error)
        })
    })
  },
  passwordResetRequest ({ dispatch }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .passwordResetRequest(payload.email)
        .then((response) => {
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          this.commit('setBusy', false)
          this.commit('setError', error)
          reject(error)
        })
    })
  },
  logout ({ dispatch }) {
    firebase.auth().signOut()
    this.commit('user/set', null)
  },
  createVerificationRequest ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .verify(payload)
        .then((response) => {
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
          resolve(response)
        })
        .catch((error) => {
          this.commit('setBusy', false)
          this.commit('setError', error)
          reject(error)
        })
    })
  }
}

export const getters = {
  loginStatus (state, getters, rootState, rootGetters) {
    return rootState.user.user !== null && rootState.user.user !== undefined
  }
}
