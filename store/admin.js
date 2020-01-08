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
  createTransaction({ commit }, payload) {
    console.log(payload)
    const communityId = payload.communityId
    delete payload.communityId
    const receiverId = payload.receiverId
    delete payload.receiverId
    console.log(receiverId)
    firebase.database().ref(`transactions/${communityId}/${receiverId}`).push(payload)
      .then(() => {
        console.log('Success, transaction created.')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updateTransactionAsPaid({ commit }, payload) {
    console.log(payload)
    firebase.database().ref(`transactions/${payload.communityId}/${payload.userId}/${payload.transactionId}/paid`).set(Date.now())
      .then(() => {
        console.log('Success, transaction updated as paid.')
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
      return currentData + payload.rewardAmount
    })
      .then(() => {
        console.log('Success, user balance updated.')
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
  deleteVerificationRequest({ commit }, payload) {
    db.ref(`userVerificationRequest/${payload.userId}/${payload.verificationType}/link`).set(null)
      .then(() => {
        console.log('Success, verification deleted')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  createUserVerification({ commit }, payload) {
    db.ref(`userVerifications/${payload.userId}/${payload.verificationType}/link`).set(`${payload.verificationLink}`)
      .then(() => {
        console.log('Success, user verified')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updatePayoutRequestPending({ commit }, payload) {
    firebase.database().ref(`payoutRequestsPending/${payload.userId}/${payload.rewardToken}`).once('value')
      .then((snapShot) => {
        if ((snapShot.val() + payload.rewardAmount) === 0) {
          firebase.database().ref(`payoutRequestsPending/${payload.userId}/${payload.rewardToken}`).set(null)
            .then(() => {
              console.log('Success, payout request deleted.')
            })
            .catch((error) => {
              console.log('error', error)
            })
        } else {
          db.ref(`payoutRequestsPending/${payload.userId}/${payload.rewardToken}`).transaction(function (currentData) {
            return currentData + payload.rewardAmount
          })
            .then(() => {
              console.log('Success, user request updated.')
            })
            .catch((error) => {
              console.log('error', error)
            })
        }
      })
  }
}

export const getters = {
  groups(state) {
    return state.groups
  }
}
