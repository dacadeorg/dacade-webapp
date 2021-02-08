/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()

export const state = () => ({
  data: null,
  userBalance: null,
  userReputation: null,
  userLearningPoints: null,
  walletAddresses: null
})

export const mutations = {
  set (state, payload) {
    if (payload) {
      state.data = {
        id: payload.uid,
        email: payload.email,
        displayName: payload.displayName
      }
    } else {
      state.data = payload
    }
  },
  clear (state) {
    state.data = null
    state.userBalance = null
    state.userLearningPoints = null
    state.walletAddress = null
    state.userReputation = null
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

  async updateWalletAddress ({ commit }, payload) {
    try {
      await db.ref(`userWallet/${payload.userId}/${payload.token}`)
        .set(`${payload.walletAddress}`)
      commit('setJobDone', true, { root: true })
      commit('setBusy', false, { root: true })
    } catch (error) {
      commit('setBusy', false, { root: true })
      commit('setError', error, { root: true })
    }
  },

  fetch ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            commit('set', user)
            // if routes are not for admin just return the user
            return resolve(user)
          } else {
            commit('set', null)
            return reject(new Error('Not logged in'))
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export const getters = {
  get (state) {
    return state.data
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
