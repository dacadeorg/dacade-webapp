/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
const db = firebase.database()
const groupsRef = db.ref('groups')

export const state = () => ({
  groups: []
})

export const actions = {
  createGroup({ commit }, payload) {
    groupsRef.push(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  getGroups: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('groups', groupsRef)
  })
}

export const getters = {
  groups(state) {
    return state.groups
  }
}
