/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import fireApp from '@/plugins/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  signUpUser({ commit }, payload) {
    let newUser = null
    fireApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        newUser = user
        const currentUser = {
          // id: user.uid,
          email: payload.email,
          name: payload.name,
          role: 'consumer'
        }
        console.log('USER', currentUser)
        commit('setUser', currentUser)
      })
      .then(() => {
        const userData = {
          email: payload.email,
          name: payload.name,
          createdAt: new Date().toISOString()
        }
        return fireApp.database().ref(`users/${newUser.uid}`).set(userData)
      })
  },
  loginUser({ commit }, payload) {
    fireApp.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode + errorMessage)
      // ...
    })
  },
  logOut({ commit }) {
    fireApp.auth().signOut()
    commit('setUser', null)
  },
  setAuthStatus({ commit }) {
    fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          id: user.uid,
          email: user.email
        }
        commit('setUser', authUser)
      }
    })
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined
  }
}
