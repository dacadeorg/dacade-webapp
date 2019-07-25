/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  user: null,
  usersData: null,
  error: null,
  busy: false,
  jobDone: false,
  forwardRoute: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  clearError(state) {
    state.error = null
  },
  setBusy(state, payload) {
    state.busy = payload
  },
  setJobDone(state, payload) {
    state.jobDone = payload
  },
  setForwardRoute(state, payload) {
    state.forwardRoute = payload
  },
  ...vuexfireMutations
}

export const actions = {
  // nuxtClientInit({ commit }) {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       const authUser = {
  //         id: user.uid,
  //         email: user.email
  //       }
  //       firebase.database().ref(`users/${authUser.id}`).once('value').then((snapShot) => {
  //         const userData = snapShot.val()
  //         authUser.balance = userData.balance
  //         authUser.displayName = userData.displayName
  //         authUser.learningPoints = userData.learningPoints
  //         authUser.teachingPoints = userData.teachingPoints
  //         if (userData.role) {
  //           authUser.role = userData.role
  //         }
  //         commit('setUser', authUser)
  //       })
  //     }
  //   })
  // },
  signUpUser({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    let newUser = null
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        newUser = user
        const currentUser = {
          id: user.user.uid,
          email: payload.email,
          displayName: payload.name,
          role: 'consumer'
        }
        commit('setUser', currentUser)
      })
      .then(() => {
        const userData = {
          email: payload.email,
          displayName: payload.name,
          learningPoints: 0,
          teachingPoints: 0,
          balance: 0
        }
        return firebase.database().ref(`users/${newUser.user.uid}`).set(userData)
      })
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  loginUser({ commit }, payload) {
    commit('setBusy', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('setJobDone', true)
        commit('setBusy', false)
      })
      .catch((error) => {
        commit('setBusy', false)
        commit('setError', error)
      })
  },
  logOut({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  getUsersDataDb: firebaseAction(({ bindFirebaseRef }, uid) => {
    bindFirebaseRef('usersData', db.ref('users').child(uid))
  })
}

export const getters = {
  user(state) {
    return state.user
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined
  },
  usersData(state) {
    return state.usersData
  },
  error(state) {
    return state.error
  },
  busy(state) {
    return state.busy
  },
  jobDone(state) {
    return state.jobDone
  },
  forwardRoute(state) {
    return state.forwardRoute
  }
}
