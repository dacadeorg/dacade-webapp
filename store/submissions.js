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
  createSubmission ({ commit }, payload) {
    commit('setBusy', true, { root: true })
    commit('clearError', null, { root: true })
    return new Promise((resolve, reject) => {
      db.ref(`submissions/${payload.communityId}`).push(payload)
        .then((snapshot) => {
          commit('setJobDone', true, { root: true })
          commit('setBusy', false, { root: true })
          // console.log(snapshot.key)
          db.ref(`openSubmissions/${snapshot.key}`).set(payload)
            .then(() => {
              commit('setJobDone', true, { root: true })
              commit('setBusy', false, { root: true })
            // console.log('success')
            }).then(() => {
              // this.$ga.event({
              //   eventCategory: 'submission',
              //   eventAction: `submissionId:${snapshot.key}`,
              //   eventLabel: `${payload.communityId}`
              // })
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
  getSubmissions: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('submissions', submissionsRef)
  }),
  getEvaluations: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('evaluations', evaluationsRef)
  })
}
export const getters = {
  submissions (state) {
    return state.submissions
  },
  evaluations (state) {
    return state.evaluations
  }
}
