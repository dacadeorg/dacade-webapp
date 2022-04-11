/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { auth as firebaseAuth } from '@/plugins/firebase'

export const state = () => ({
  current: null,
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  clear(state) {
    state.current = null
  },
}

export const actions = {
  clear({ commit }, payload) {
    commit('clear')
    this.commit('profile/communities/clear')
  },

  async fetch({ commit, dispatch, getters }, username) {
    if (!username) return

    try {
      const current = getters.current
      if (!current || current?.username.toLowerCase() !== username.toLowerCase()) {
        await dispatch('clear')
      }

      const { data } = await this.$api.get('users/' + username)
      commit('setCurrent', data)
      return data
    } catch (e) {
      await dispatch('clear')
      return null
    }
  },
}

export const getters = {
  current(state) {
    return state.current
  },
}
