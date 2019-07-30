/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
const db = firebase.database()
const gradingsRef = db.ref('gradings')

export const state = () => ({
  groups: []
})

export const actions = {
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
  },
  addUserNotification({ commit }, payload) {
    db.ref(`notifications/${payload.userId}`).push(payload)
      .then(() => {
        console.log('success user notification added')
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
