/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  communityData: [],
  communityDataPreview: []
})

export const mutations = {
  setCommunityData(state, payload) {
    state.communityData = payload
  },
  setCommunityDataPreview(state, payload) {
    state.communityDataPreview = payload
  }
}

export const actions = {
  getcommunityData({ commit }, payload) {
    return db.ref(`communityData/${payload}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      commit('setCommunityData', communityData)
    })
  },
  getCommunityDataPreview({ commit }) {
    firebase.database().ref(`communityDataPreview`).once('value').then((snapShot) => {
      const communityDataPreview = snapShot.val()
      commit('setCommunityDataPreview', communityDataPreview)
    })
  }
}

export const getters = {
  communityData(state) {
    return state.communityData
  },
  communityDataPreview(state) {
    return state.communityDataPreview
  }
}
