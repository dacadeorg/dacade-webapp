/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [],
  current: [],
  currentMinted: false,
})

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },

  setCurrentMintingStatus(state, payload) {
    state.currentMinted = payload
  },

  setList(state, payload) {
    state.list = payload
  },

  clear(state, payload) {
    state.list = []
    state.current = null
  },
}

export const actions = {
  async find({ commit }, { id }) {
    const { data } = await this.$api.get(`certificates/${id}`)
    commit('setCurrent', data)
    commit('setCurrentMintingStatus', !!data?.minting?.tx)
  },
  async all({ commit, getters }, username) {
    commit('clear')
    if (!username) return
    const { data } = await this.$api.get(`certificates?username=${username}`)
    commit('setList', data)
  },
  async mint({ commit, getters }, { id, address, signature }) {
    const { data } = await this.$api.post(`certificates/mint`, {
      certificateId: id,
      receiver: address,
      signature,
    })
    if (data.certificate) {
      commit('setCurrent', {
        ...(getters.current || data.certificate),
        minting: data.certificate.minting,
      })
    }
    console.log(data)
    return data
  },
}

export const getters = {
  current(state) {
    return state.current
  },
  currentMinted(state) {
    return state.currentMinted
  },
  list(state) {
    return state.list
  },
}
