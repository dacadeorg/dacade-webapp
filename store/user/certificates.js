/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  certificates: [],
  certificate: [],
})

export const mutations = {
  setCertificate(state, payload) {
    state.certificate = payload
  },

  setCertificates(state, payload) {
    state.certificates = payload
  },

  clear(state, payload) {
    state.certificates = []
    state.certificate = []
  },
}

export const actions = {
  async find({ commit }, { id }) {
    const { data } = await this.$api.get(
      `certificates/${id}}`
    )
    commit('setCertificate', data)
  },
  async all({ commit }, username) {
    if (!username) return
    const { data } = await this.$api.get(`certificates?username=${username}`)
    commit('setCertificates', data)
  },
}

export const getters = {
  certificate(state) {
    return state.certificate
  },
  certificates(state) {
    return state.certificates
  }
}
