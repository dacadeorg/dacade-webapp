/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
const db = firebase.database()
const evaluationsRef = db.ref('evaluations')

export const state = () => ({
  groups: []
})

export const actions = {
  createEvaluation({ commit }, payload) {
    evaluationsRef.push(payload)
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
