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
    state.current = payload
  },
  setList (state, payload) {
    const submissions = payload
    const ordered = []
    console.log(submissions)
    Object.keys(submissions)
      .reverse()
      .forEach(function (key) {
        const { userId, displayName, date, text, communityId, submissionPoints, submissionReward } = submissions[key]
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
