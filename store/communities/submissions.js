/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  current: null,
  list: []
})

export const mutations = {
  setCurrent (state, payload) {
    const { submission, feedbacks, evaluations } = payload
    const {
      userId,
      displayName,
      date,
      text,
      communityId,
      submissionPoints,
      submissionReward
    } = submission

    state.current = {
      communityId,
      user: {
        id: userId,
        displayName
      },
      date,
      text,
      rewards: submissionReward,
      points: submissionPoints,
      feedbacks: Object.keys(feedbacks).map((key) => {
        return {
          id: key,
          content: feedbacks[key].content,
          date: feedbacks[key].date,
          user: {
            id: feedbacks[key].reviewUserId,
            displayName: feedbacks[key].reviewDisplayName
          }
        }
      }),
      evaluations: (() => {
        if (evaluations) {
          const user = {
            id: evaluations.evaluationUserId,
            displayName: evaluations.evaluationDisplayName
          }
          delete evaluations.evaluationDisplayName
          delete evaluations.evaluationUserId
          return [
            {
              ...evaluations,
              user
            }
          ]
        }
        return []
      })()
    }
  },
  setList (state, payload) {
    const submissions = payload
    const ordered = []
    Object.keys(submissions)
      .reverse()
      .forEach(function (key) {
        const {
          userId,
          displayName,
          date,
          text,
          communityId,
          submissionPoints,
          submissionReward
        } = submissions[key]
        ordered.push({
          id: key,
          communityId,
          user: {
            id: userId,
            displayName
          },
          date,
          text,
          rewards: submissionReward,
          points: submissionPoints
        })
      })
    state.list = ordered
  }
}

export const actions = {
  fetch ({ commit }, communitySlug) {
    db.ref(`submissions/${communitySlug}`)
      .orderByKey()
      .limitToLast(6)
      .once('value')
      .then((snapShot) => {
        const newSubmissions = snapShot.val()
        commit('setList', newSubmissions)
      })
  },
  find ({ commit }, { communitySlug, id }) {
    (async () => {
      const snapShot = await db
        .ref(`submissions/${communitySlug}/${id}`)
        .once('value')

      const feedbackPromise = await firebase
        .database()
        .ref(`reviews/${id}`)
        .once('value')

      const evaluationPromise = await firebase
        .database()
        .ref(`evaluations/${id}`)
        .once('value')

      commit('setCurrent', {
        feedbacks: feedbackPromise.val(),
        submission: snapShot.val(),
        evaluations: evaluationPromise.val()
      })
    })()
  }
}

export const getters = {
  current (state) {
    return state.current
  },
  list (state) {
    return state.list
  }
}
