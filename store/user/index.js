/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export const state = () => ({
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
})

export const mutations = {
  set(state, payload) {
    state.data = payload
  },
  clear(state) {
    state.data = null
  },
}

export const actions = {
  async updateWalletAddress({ commit }, payload) {
    // try {
    //   await db
    //     .ref(`userWallet/${payload.userId}/${payload.token}`)
    //     .set(`${payload.walletAddress}`)
    //   commit('setJobDone', true, { root: true })
    //   commit('setBusy', false, { root: true })
    // } catch (error) {
    //   commit('setBusy', false, { root: true })
    //   commit('setError', error, { root: true })
    // }
  },

  fetch({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return this.$apiClient('users-current').then(({ data }) => {
            commit('set', data)
            return resolve(user)
          })
        } else {
          commit('set', null)
          return reject(new Error('Not logged in'))
        }
      })
    })
  },

  async getToken({ commit }, payload) {
    const user = firebase.auth().currentUser
    if (user) {
      const token = await user.getIdToken()
      return token
    }
    return null
  },
}

export const getters = {
  get(state) {
    return state.data
  },
  data(state) {
    return state.data
  },
  balance(state) {
    return state.data?.balance
  },
  reputation(state) {
    return state.data?.reputation
  },
  learningPoints(state) {
    return state.data?.userLearningPoints
  },
  walletAddresses(state) {
    return state.data?.walletAddresses
  },
}
