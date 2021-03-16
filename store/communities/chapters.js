/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  current: null
})

export const mutations = {
  setCurrent (state, payload) {
    state.current = payload
  }
}

export const actions = {
  find ({ rootGetters, commit }, id) {
    const community = rootGetters['communities/current']
    const chapter = community.chapters[id]
    console.log(chapter)
    commit('setCurrent', chapter)
  }
}

export const getters = {
  current (state) {
    return state.current
  }
}
