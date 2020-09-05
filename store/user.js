/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()

export const state = () => ({
  user: null,
  data: null,
  userBalance: null,
  userReputation: null,
  userLearningPoints: null,
  walletAddresses: null
})

export const mutations = {
  set (state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}

export const actions = {
  getLearningPoints: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userLearningPoints', db.ref('learningPoints').child(uid))
  }),
  getBalance: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userBalance', db.ref('balance').child(uid))
  }),
  getReputation: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userReputation', db.ref('reputation').child(uid))
  }),
  updateWalletAddress ({ commit }, payload) {
    console.log(payload)
    db.ref(`userWallet/${payload.userId}/${payload.token}`)
      .set(`${payload.walletAddress}`)
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
  get (state) {
    return state.user
  },
  data (state) {
    return state.data
  },
  balance (state) {
    return state.userBalance
  },
  reputation (state) {
    return state.userReputation
  },
  learningPoints (state) {
    return state.userLearningPoints
  },
  walletAddresses (state) {
    return state.walletAddresses
  }
}
