/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.database()
const submissionsRef = db.ref('submissions')
const evaluationsRef = db.ref('evaluations')

export const state = () => ({
  submissions: [],
  evaluations: []
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
  }),
  getEvaluations: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('evaluations', evaluationsRef)
  })
}
export const getters = {
  submissions(state) {
    return state.submissions
  },
  evaluations(state) {
    return state.evaluations
  }
}
