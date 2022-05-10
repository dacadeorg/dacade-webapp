/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth as firebaseAuth } from '@/plugins/firebase'

export const state = () => ({
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
})

export const mutations = {
  set(state, auth) {
    state.data = auth?.toJSON() || null
  },
  clear(state) {
    state.data = null
  },
}

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
      this.dispatch('user/clear')
      await signInWithEmailAndPassword(firebaseAuth, email, password)
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
      const response = await sendPasswordResetEmail(firebaseAuth, email)
      this.commit('setJobDone', true)
      this.commit('setBusy', false)
      return response
    } catch (error) {
      this.commit('setBusy', false)
      this.commit('setError', error)
      throw error
    }
  },
  async logout() {
    await signOut(firebaseAuth)
    this.dispatch('user/clear')
    this.$router.push(this.localePath('/communities'))
  },
  async resendEmailVerification() {
    const res = await this.$api.get('auth/resend-email-verification-link')
    return res
  },
}

export const getters = {
  get(state) {
    return state.data
  },
  data(state) {
    return state.data
  },
  check(state) {
    return state.data !== null && state.data !== undefined
  },
  isVerified(state) {
    return state.data && state.data?.emailVerified
  },
}
