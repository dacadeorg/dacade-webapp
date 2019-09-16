/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()
const communityDataPreviewRef = db.ref('communityDataPreview')
const communityDataRef = db.ref('communityData')

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
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('communityDataPreview', communityDataPreviewRef)
  }),
  getBoundcommunityData: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('communityData', communityDataRef)
  }),
  getcommunityData({ commit }, payload) {
    console.log(payload)
    return db.ref(`communityData/${payload}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      console.log(communityData)
      //communityDataPreview.key = params.slug // snapShot.key
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
