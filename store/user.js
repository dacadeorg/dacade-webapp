/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  user: null,
  usersData: null,
  error: null,
  busy: false,
  jobDone: false,
  forwardRoute: null,
  userNotifications: null,
  userBalance: null,
  userReputation: null,
  userLearningPoints: null,
  communityDataPreview: null
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

export const getters = {
  loginStatus(state) {
    return state.user !== null && state.user !== undefined
  },
  usersData(state) {
    return state.usersData
  },
  error(state) {
    return state.error
  },
  busy(state) {
    return state.busy
  },
  jobDone(state) {
    return state.jobDone
  },
  forwardRoute(state) {
    return state.forwardRoute
  },
  userNotifications(state) {
    return state.userNotifications
  },
  userBalance(state) {
    return state.userBalance
  },
  userReputation(state) {
    return state.userReputation
  },
  userLearningPoints(state) {
    return state.userLearningPoints
  }
  // userWalletAddresses(state) {
  //   return state.userWalletAddresses
  // }
}