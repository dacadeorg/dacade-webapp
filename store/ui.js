/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  colors: {},
  locked: false,
  showReferralPopup: false,
  showInformationPopup: false,
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
  setShowInformationPopup(state, payload) {
    state.showInformationPopup = payload
  },
}

export const actions = {
  toggleBodyScrolling({ commit }, lock) {
    const body = document.body
    commit('setLocked', lock)
    if (lock) {
      body.style.top = `-${document.documentElement.scrollTop}px`
      body.style.position = 'fixed'
      body.style.overflowY = 'scroll'
      return
    }
    const scrollTop = (body.style.top.match(/(\d+)/) || [0])[0]
    body.style.removeProperty('position')
    body.style.removeProperty('top')
    body.style.removeProperty('overflow-y')
    window.scrollTo(0, scrollTop)
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
  toggleShowInformationPopup({ commit, state, dispatch }, show) {
    dispatch('toggleBodyScrolling', show)
    commit('setShowInformationPopup', show)
  },
}

export const getters = {
  colors(state) {
    return state.colors
  },
  showReferralPopup(state) {
    return state.showReferralPopup
  },
  showInformationPopup(state) {
    return state.showInformationPopup
  },
}
