/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { auth as firebaseAuth } from '@/plugins/firebase'

export const state = () => ({
  sumsubToken: null,
})

export const mutations = {
  setSumsubToken(state, payload) {
    state.sumsubToken = payload
  }
}

export const actions = {

  async getSumsubToken({ commit }) {
    const user = firebaseAuth.currentUser
    if (user) {
      try {
        const { data } = await this.$api.post('users/sumsub/get-access-token')
        const token = data?.token
        if(!token) return
        commit('setSumsubToken', token)
        return token
      } catch (e) {
        console.log(e)
        return null
      }
    }
  },

  async completeSumSubVerification({commit, dispatch }) {
    await dispatch('fetch')
    commit('setSumsubToken', null)

  }
}

export const getters = {
  sumsubToken(state) {
    return state.sumsubToken
  }
}
