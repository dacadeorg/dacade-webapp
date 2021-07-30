/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'

export const state = () => ({
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
})

export const actions = {
  async signUp({ dispatch, commit }, payload) {
    this.commit('setBusy', true)
    this.commit('clearError')
    try {
      const user = await this.$api.post('auth/signup', {
        ...payload,
        redirectLink: '/communities',
      })

      this.dispatch('events/create', {
        name: 'user-signed-up',
        attributes: {
          userId: user.uid,
        },
      })
      return dispatch('login', {
        email: payload.email,
        password: payload.password,
      })
    } catch (error) {
      /* handle error */
      this.commit('setError', error)
      this.commit('setBusy', false)
      throw error
    }
  },
  async login({ commit }, { email, password }) {
    this.commit('setBusy', true)
    this.commit('clearError')
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      await this.dispatch('user/fetch')
      this.commit('setJobDone', true)
      this.commit('setBusy', false)
    } catch (error) {
      this.commit('user/set', null)
      this.commit('setBusy', false)
      this.commit('setError', error)
      throw error
    }
  },
  async passwordResetRequest({ dispatch }, { email }) {
    this.commit('setBusy', true)
    this.commit('clearError')
    try {
      const response = await firebase.auth().sendPasswordResetEmail(email)
      this.commit('setJobDone', true)
      this.commit('setBusy', false)
      return response
    } catch (error) {
      this.commit('setBusy', false)
      this.commit('setError', error)
      throw error
    }
  },
  logout() {
    firebase.auth().signOut()
    this.dispatch('user/clear')
    this.$router.push('/communities')
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
  check(state, getters, rootState, rootGetters) {
    return rootState.user.data !== null && rootState.user.data !== undefined
  },
}
