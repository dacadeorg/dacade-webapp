/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import auth from '@/lib/auth'

export const actions = {
  signUp({ dispatch, commit }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .signUp(payload)
        .then((user) => {
          if (process.env.NODE_ENV !== 'development') {
            this.$ga.event({
              eventCategory: 'registration',
              eventAction: `registration userId: ${user.uid}`,
            })
          }
          commit('user/set', user, { root: true })
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
          resolve(user)
        })
        .catch((error) => {
          reject(error)
          this.commit('setBusy', false)
          this.commit('setError', error)
        })
    })
  },

  login({ commit }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .login(payload)
        .then((response) => {
          commit('user/set', response.user, { root: true })
          resolve(response)
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
        })
        .catch((error) => {
          reject(error)
          commit('user/set', null, { root: true })
          this.commit('setBusy', false)
          this.commit('setError', error)
        })
    })
  },
  passwordResetRequest({ dispatch }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    return new Promise((resolve, reject) => {
      auth
        .passwordResetRequest(payload.email)
        .then((response) => {
          resolve(response)
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
        })
        .catch((error) => {
          reject(error)
          this.commit('setBusy', false)
          this.commit('setError', error)
        })
    })
  },
  logout({ dispatch, commit }) {
    firebase.auth().signOut()
    commit('user/clear', null, { root: true })
    commit('user/notifications/clear', null, { root: true })
  },
  createVerificationRequest({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .verify(payload)
        .then((response) => {
          resolve(response)
          this.commit('setJobDone', true)
          this.commit('setBusy', false)
        })
        .catch((error) => {
          reject(error)
          this.commit('setBusy', false)
          this.commit('setError', error)
        })
    })
  },
}

export const getters = {
  loginStatus(state, getters, rootState, rootGetters) {
    return rootState.user.data !== null && rootState.user.data !== undefined
  },
}
