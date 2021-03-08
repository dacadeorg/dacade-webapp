/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  colors: {}
})

export const mutations = {
  setColors (state, payload) {
    state.colors = {
      ...state.colors,
      ...payload
    }
  }
}

export const getters = {
  colors (state) {
    return state.colors
  }
}
