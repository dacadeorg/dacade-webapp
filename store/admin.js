/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import firebase from '@/plugins/firebase'
const db = firebase.database()

export const state = () => ({
  groups: []
})

export const actions = {
  createEvaluation({ commit }, payload) {
    const key = payload['.key']
    delete payload['.key']
    firebase.database().ref(`evaluations/${key}`).set(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateSubmission({ commit }, payload) {
    const key = payload['.key']
    delete payload['.key']
    db.ref(`submissions/${payload.communityId}/${key}`).set(payload)
      .then(() => {
        db.ref(`openSubmissions/${key}`).remove()
          .then(() => {
            console.log('success')
          })
          .catch((error) => {
            console.log('error', error)
          })
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateReview({ commit }, payload) {
    const key = payload['.key']
    const submissionId = payload.submissionId
    delete payload['.key']
    delete payload.submissionId
    db.ref(`reviews/${submissionId}/${key}`).set(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateBalance({ commit }, payload) {
    db.ref(`balance/${payload.userId}/${payload.rewardToken}`).transaction(function (currentData) {
      console.log(payload.rewardAmount)
      return currentData + payload.rewardAmount
    })
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateReputation({ commit }, payload) {
    db.ref(`reputation/${payload.userId}/${payload.communityId}`).transaction(function (currentData) {
      return currentData + payload.rewardAmount
    })
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  addLearningPoints({ commit }, payload) {
    db.ref(`learningPoints/${payload.userId}/${payload.communityId}`).transaction(function (currentData) {
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
