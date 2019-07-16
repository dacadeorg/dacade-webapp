/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()
const communityDataRef = db.ref('communityData')
const lcDataRef = db.ref('LCData')

export const state = () => ({
  communityData: [],
  lcData: []
})

export const mutations = {
  setLc(state, payload) {
    state.lcData = payload
  }
}

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('communityData', communityDataRef)
  }),
  getBoundLcData: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('lcData', lcDataRef)
  }),
  getLcData({ commit }, payload) {
    console.log(payload)
    return db.ref(`LCData/${payload}`).once('value').then((snapShot) => {
      const lcData = snapShot.val()
      console.log(lcData)
      //communityData.key = params.slug // snapShot.key
      commit('setLc', lcData)
    })
  }
}

export const getters = {
  communityData(state) {
    return state.communityData
  },
  lcData(state) {
    return state.lcData
  }
}
