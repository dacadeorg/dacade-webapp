/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  colors: {},
  locked: false,
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
}

export const getters = {
  colors(state) {
    return state.colors
  },
}
