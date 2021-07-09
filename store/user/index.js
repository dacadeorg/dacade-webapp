/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export const state = () => ({
  data: null,
  userBalance: null,
  balance: null,
  walletAddresses: null,
  token: null,
})

export const mutations = {
  set(state, payload) {
    state.data = payload
  },
  clear(state) {
    state.data = null
    state.token = null
  },
  setToken(state, payload) {
    state.token = payload
  },
}

export const actions = {
  clear({ commit }, payload) {
    commit('clear')
    this.commit('user/notifications/clear')
    this.commit('user/reputations/clear')
    this.commit('user/wallets/clear')
    this.commit('user/communities/clear')
  },

  async fetch({ commit, dispatch }, payload) {
    const user = firebase.auth().currentUser
    if (!user) {
      dispatch('clear')
      return null
    }

    try {
      await dispatch('getToken')
      const { data } = await this.$api.get('users/current')
      commit('set', data)
      return data
    } catch (e) {
      console.log(e)
      dispatch('clear')
      return null
    }
  },

  async update({ dispatch }, payload) {
    await this.$api.patch('users/update', payload)
    dispatch('fetch')
  },

  async getToken({ commit }, payload) {
    const user = firebase.auth().currentUser
    if (user) {
      const token = await user.getIdToken()
      commit('setToken', token)
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
  token(state) {
    return state.token
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
