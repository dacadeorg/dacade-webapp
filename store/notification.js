/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  userNotifications: null,
  count: 0
})

export const mutations = {
  clear (state) {
    state.userNotifications = null
  },
  setCount (state) {
    let notifications = 0
    if (this.notifications) {
      for (
        let index = 0;
        index < Object.values(this.notifications).length;
        index++
      ) {
        if (!Object.values(this.notifications)[index].notificationRead) {
          notifications++
        }
      }
    }
    state.count = parseFloat(notifications).toFixed(0)
  },
  ...vuexfireMutations
}

export const actions = {
  fetch: firebaseAction(({ bindFirebaseRef, commit }, uid) => {
    bindFirebaseRef('userNotifications', db.ref('notifications').child(uid)).then(() => commit('setCount'))
  }),
  markAsRead ({ commit }, payload) {
    db.ref(`notifications/${payload.userId}/${payload.id}/notificationRead`)
      .set(true)
      .then(() => {
        this.commit('setJobDone', true)
        this.commit('setBusy', false)
      })
      .catch((error) => {
        this.commit('setBusy', false)
        this.commit('setError', error)
      })
  },
  add ({ commit }, payload) {
    db.ref(`notifications/${payload.userId}`)
      .push(payload)
      .then(() => {
        console.log('success user notification added')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

export const getters = {
  get (state) {
    return state.userNotifications
  },
  count (state) {
    return state.count
  }
}
