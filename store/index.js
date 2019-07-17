/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  user: null,
  usersData: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}

export const actions = {
  nuxtClientInit({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          id: user.uid,
          email: user.email
        }
        firebase.database().ref(`users/${authUser.id}`).once('value').then((snapShot) => {
          const userData = snapShot.val()
          authUser.balance = userData.balance
          authUser.displayName = userData.displayName
          authUser.learningPoints = userData.learningPoints
          authUser.teachingPoints = userData.teachingPoints
          if (userData.role) {
            authUser.role = userData.role
          }
          commit('setUser', authUser)
        })
      }
    })
  },
  signUpUser({ commit }, payload) {
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
  },
  loginUser({ commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode + errorMessage)
      // ...
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
  }
}
