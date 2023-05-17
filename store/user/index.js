/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { auth as firebaseAuth } from '@/plugins/firebase'

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
    this.commit('auth/clear')
  },

  async fetch({ commit, dispatch }, payload) {
    const user = firebaseAuth.currentUser
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
      await dispatch('clear')
      return null
    }
  },

  async updateName({ dispatch }, payload) {
    await this.$api.patch('users/update/name', payload)
    dispatch('fetch')
  },

  async update({ dispatch }, payload) {
    await this.$api.patch('users/update', payload)
    dispatch('fetch')
  },

  async getToken({ commit, dispatch }, payload) {
    const user = firebaseAuth.currentUser
    if (user) {
      try {
        const token = await user.getIdToken()
        if (!token) throw new Error("Couldn't fetch the token")
        commit('setToken', token)
        return token
      } catch (e) {
        console.log(e)
        dispatch('clear')
        return null
      }
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
  isKycVerified(state) {
    return state.data?.kycStatus === 'VERIFIED'
  },
}
