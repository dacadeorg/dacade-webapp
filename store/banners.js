/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  showCookiePolicy: false,
})

export const mutations = {
  setCookiePolicyVisibility(state, payload) {
    state.showCookiePolicy = payload
  },
}
export const actions = {
  checkCookiePolicy({ commit }) {
    const cookieRes = this.$cookies.get('privacy-policy-banner')
    if (!cookieRes) {
      commit('setCookiePolicyVisibility', true)
    }
  },
  acceptCookiePolicy({ commit }) {
    commit('setCookiePolicyVisibility', false)
    this.$cookies.set('privacy-policy-banner', true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  },
}
export const getters = {
  showCookiePolicy(state) {
    return state.showCookiePolicy
  },
}
