/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

const db = firebase.database()
const submissionsRef = db.ref('submissions')
const gradingsRef = db.ref('gradings')

export const state = () => ({
  submissions: [],
  gradings: []
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
  getGradings: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('gradings', gradingsRef)
  })
}
export const getters = {
  submissions(state) {
    return state.submissions
  },
  gradings(state) {
    return state.gradings
  }
}
