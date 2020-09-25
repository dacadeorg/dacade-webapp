/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
const db = firebase.database()
const reviewsRef = db.ref('reviews')

export const state = () => ({
  reviews: []
})

export const actions = {
  createReview ({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    const key = payload['.key']
    delete payload['.key']
    return new Promise((resolve, reject) => {
      firebase.database().ref(`reviews/${key}`).push(payload)
        .then(() => {
          firebase.database().ref(`openSubmissions/${key}/reviews/${payload.reviewUserId}`).set(true)
            .then(() => {
              commit('setJobDone', true, { root: true })
              commit('setBusy', false, { root: true })
              if (process.env.NODE_ENV !== 'development') {
                this.$ga.event({
                  eventCategory: 'feedback',
                  eventAction: `feedbackSubmissionId:${key}`
                })
              }
              resolve()
            })
            .catch((error) => {
              commit('setBusy', false, { root: true })
              commit('setError', error, { root: true })
              reject(error)
            })
        })
        .catch((error) => {
          commit('setBusy', false, { root: true })
          commit('setError', error, { root: true })
          reject(error)
        })
    })
  },
  getReviews: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('reviews', reviewsRef)
  })
}

export const getters = {
  reviews (state) {
    return state.reviews
  }
}
