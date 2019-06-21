/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()
const communityDataRef = db.ref('communityData')

export const state = () => ({
  communityData: []
})

export const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('communityData', communityDataRef)
  })
}

export const getters = {
  communityData(state) {
    return state.communityData
  }
}
