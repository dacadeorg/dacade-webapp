/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  navbar: {}
})

export const mutations = {
  setNavbar (state, payload) {
    state.navbar = {
      ...state.navbar,
      ...payload
    }
  }
}

export const getters = {
  navbar (state) {
    return state.navbar
  }
}
