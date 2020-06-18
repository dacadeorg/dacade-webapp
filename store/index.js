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

export const getters = {
  user(state) {
    return state.user
  },
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
