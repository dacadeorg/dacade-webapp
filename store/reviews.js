/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
const db = firebase.database()
const reviewsRef = db.ref('reviews')

export const state = () => ({
  reviews: []
})

export const actions = {
  createReview({ commit }, payload) {
    reviewsRef.push(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  getReviews: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('reviews', reviewsRef)
  })
}

export const getters = {
  reviews(state) {
    return state.reviews
  }
}
