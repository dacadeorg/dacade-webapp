/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  colors: {},
  locked: false,
  showReferralPopup: false,
})

export const mutations = {
  setColors(state, payload) {
    state.colors = {
      ...state.colors,
      ...payload,
    }
  },
  setLocked(state, payload) {
    state.locked = payload
  },
  setShowReferralPopup(state, payload) {
    state.showReferralPopup = payload
  },
}

export const actions = {
  toggleBodyScrolling({ commit }, lock) {
    const body = document.body
    commit('setLocked', lock)
    if (lock) {
      body.style.overflow = 'hidden'
      return
    }
    body.style.overflow = 'visible'
  },
  unlockBodyScrolling({ state, dispatch }) {
    if (state.locked) {
      dispatch('toggleBodyScrolling', false)
    }
  },
  toggleShowReferralPopup({ commit, state, dispatch }, show) {
    dispatch('toggleBodyScrolling', show)
    commit('setShowReferralPopup', show)
  },
}

export const getters = {
  colors(state) {
    return state.colors
  },
  showReferralPopup(state) {
    return state.showReferralPopup
  },
}
