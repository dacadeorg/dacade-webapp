/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  list: [],
  count: 0,
  content: null,
  current: null,
  menus: [],
})

export const mutations = {
  setCurrent(state, payload) {
    this.commit('ui/setColors', {
      ...payload.colors,
    })
    state.current = payload
  },
  setList(state, payload) {
    state.list = payload
  },
  setContent(state, payload) {
    state.content = payload
  },
  setNavigation(state, payload) {
    const { list } = payload
    state.menus = list
  },
}

export const actions = {
  async find({ commit }, slug) {
    const { data } = await this.$apiClient('communities-show', {
      slug,
    })
    commit('setCurrent', data)
  },
  async all({ commit }) {
    const { data } = await this.$apiClient('communities-list')
    commit('setList', data)
  },
  content({ commit }, payload) {
    return db
      .ref(`communityData/${payload}`)
      .once('value')
      .then((snapShot) => {
        const communityData = snapShot.val()
        commit('setContent', communityData)
      })
  },
}

export const getters = {
  list(state) {
    return state.list
  },
  current(state) {
    return state.current
  },
  content(state) {
    return state.content
  },
  navigation(state) {
    return state.menus
  },
}
