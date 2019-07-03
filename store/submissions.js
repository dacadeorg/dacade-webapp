/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'
const db = firebase.database()
const submissionsRef = db.ref('submissions')

export const state = () => ({
  submissions: []
})

export const actions = {
  createSubmission({ commit }, payload) {
    submissionsRef.push(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  getSubmissions: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('submissions', submissionsRef)
  })
}

export const getters = {
  submissions(state) {
    return state.submissions
  }
}
