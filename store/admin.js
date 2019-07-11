/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
const db = firebase.database()
const groupsRef = db.ref('groups')
const gradingsRef = db.ref('gradings')

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
  createGrading({ commit }, payload) {
    gradingsRef.push(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateSubmission({ commit }, payload) {
    console.log(payload)
    const key = payload['.key']
    delete payload['.key']
    db.ref(`submissions/${key}`).set(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  getGroups: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('groups', groupsRef)
  }),
  updateReview({ commit }, payload) {
    const key = payload['.key']
    delete payload['.key']
    db.ref(`reviews/${key}`).set(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

export const getters = {
  groups(state) {
    return state.groups
  }
}
