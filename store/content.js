/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()
const communityDataPreviewRef = db.ref('communityDataPreview')
const communityDataRef = db.ref('communityData')

export const state = () => ({
  communityDataPreview: [],
  communityData: []
})

export const mutations = {
  setCommunityData(state, payload) {
    state.communityData = payload
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
  }
}

export const getters = {
  communityDataPreview(state) {
    return state.communityDataPreview
  },
  communityData(state) {
    return state.communityData
  }
}
