/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const actions = {
  signUpUser({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    const newUser = null
    const user = null
    this.getDatabaseAccess()
  },
  getDatabaseAccess() {
    firebase.database().ref('users').orderByChild('displayName').equalTo(`${payload.name}`).once('value')
      .then((snapShot) => {
        if (snapShot.exists()) {
          const error = { message: 'This username is already in use' }
          commit('setBusy', false)
          commit('setError', error)
        } else {
          firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              user = firebase.auth().currentUser
              newUser = user
              return user.updateProfile({ displayName: payload.name })
                .then(() => {
                  const currentUser = {
                    id: user.uid,
                    email: payload.email,
                    displayName: payload.name
                  }
                  commit('setUser', currentUser)
                })
            })
            .then(() => {
              const userData = {
                displayName: payload.name
              }
              return firebase.database().ref(`users/${user.uid}`).set(userData)
            })
            .then(() => {
              const notification = {
                date: Date.now(),
                displayName: payload.name,
                link: '/communities',
                message: `👋 Welcome to dacade ${payload.name}! In this notification view, you will be notified about your successes, like earnings from your submissions and reviews. To get started, click on this link and choose a learning community.`,
                notificationRead: false,
                userId: user.uid
              }
              return firebase.database().ref(`notifications/${user.uid}`).push(notification)
            }).then(() => {
              this.$ga.event({
                eventCategory: 'registration',
                eventAction: `registration userId: ${user.uid}`
              })
            })
            .then(() => {
              commit('setJobDone', true)
              commit('setBusy', false)
            })
            .catch((error) => {
              commit('setBusy', false)
              commit('setError', error)
            })
        }
      })
  },
  getUserNotifications: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userNotifications', db.ref('notifications').child(uid))
  }),
  getUserLearningPoints: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userLearningPoints', db.ref('learningPoints').child(uid))
  }),
  getUserBalance: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userBalance', db.ref('balance').child(uid))
  }),
  getUserReputation: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('userReputation', db.ref('reputation').child(uid))
  }),
  updateWalletAddress({ commit }, payload) {
    console.log(payload)
    db.ref(`userWallet/${payload.userId}/${payload.token}`).set(`${payload.walletAddress}`)
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  createVerificationRequest({ commit }, payload) {
    db.ref(`userVerificationRequest/${payload.userId}/${payload.verificationType}`).set({
      displayName: payload.displayName,
      link: payload.verificationLink
    })
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}
export const getters = {
  user(state) {
    return state.user
  }
}
