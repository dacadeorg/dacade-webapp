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
  setUser (state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}

export const action = {
  getUserNotifications: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userNotifications', db.ref('notifications').child(uid))
  }),
  getUserLearningPoints: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userLearningPoints', db.ref('learningPoints').child(uid))
  }),
  getUserBalance: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userBalance', db.ref('balance').child(uid))
  }),
  getUserReputation: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userReputation', db.ref('reputation').child(uid))
  }),
  updateWalletAddress ({ commit }, payload) {
    console.log(payload)
    db.ref(`userWallet/${payload.userId}/${payload.token}`).set(`${payload.walletAddress}`)
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
  user (state) {
    return state.user
  },
  loginStatus (state) {
    return state.user !== null && state.user !== undefined
  },
  usersData (state) {
    return state.usersData
  },
  error (state) {
    return state.error
  },
  busy (state) {
    return state.busy
  },
  jobDone (state) {
    return state.jobDone
  },
  forwardRoute (state) {
    return state.forwardRoute
  },
  userNotifications (state) {
    return state.userNotifications
  },
  userBalance (state) {
    return state.userBalance
  },
  userReputation (state) {
    return state.userReputation
  },
  userLearningPoints (state) {
    return state.userLearningPoints
  }
  // userWalletAddresses(state) {
  //   return state.userWalletAddresses
  // }
}
