/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export const actions = {
  createPayoutRequest({ commit }, payload) {
    const communityId = payload.communityId
    delete payload.communityId
    const userId = payload.userId
    delete payload.userId
    firebase.database().ref(`payoutRequests/${communityId}/${userId}`).set(payload)
      .then(() => {
        console.log('Success, payout request created.')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  updatePayoutRequestAsPaid({ commit }, payload) {
    firebase.database().ref(`payoutRequests/${payload.communityId}/${payload.userId}/paid`).set(Date.now())
      .then(() => {
        console.log('Success, payout request updated as paid.')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  setPayoutRequestPending({ commit }, payload) {
    firebase.database().ref(`payoutRequestsPending/${payload.userId}/${payload.tokenFormat}`).set(payload.payoutAmount)
      .then(() => {
        console.log('Success, payout request pending.')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}
