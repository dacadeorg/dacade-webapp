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
  },
  increaseUserBalance({ commit }, payload) {
    db.ref(`users/${payload.userId}/balance`).transaction(function (currentData) {
      return currentData + payload.rewardAmount
    })
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  increaseUserTeachingPoints({ commit }, payload) {
    db.ref(`users/${payload.userId}/teachingPoints`).transaction(function (currentData) {
      return currentData + payload.rewardAmount
    })
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  increaseUserLearningPoints({ commit }, payload) {
    db.ref(`users/${payload.userId}/learningPoints`).transaction(function (currentData) {
      return currentData + payload.learningPoints
    })
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
