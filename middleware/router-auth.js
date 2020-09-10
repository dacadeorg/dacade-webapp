/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export default function ({ store, redirect, route }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const authUser = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName
      }
      // Todo: Fix this so we dont have to always make a call if user is admin
      if (isAdminRoute(route)) {
        firebase
          .database()
          .ref(`admin/${authUser.id}`)
          .once('value')
          .then((snapShot) => {
            if (!snapShot.val()) {
              store.commit('setForwardRoute', route.path)
              redirect('/login')
            }
          })
      }
      if (!store.getters['user/get']) {
        store.commit('user/set', authUser)
      }
      if (
        !store.getters['user/balance'] ||
        store.getters['user/balance']['.key'] !== authUser.id
      ) {
        store.dispatch('user/getBalance', authUser.id)
      }
      if (
        !store.getters['notification/get'] ||
        store.getters['notification/get']['.key'] !== authUser.id
      ) {
        store.dispatch('notification/fetch', authUser.id)
      }
      if (
        !store.getters['user/reputation'] ||
        store.getters['user/reputation']['.key'] !== authUser.id
      ) {
        store.dispatch('user/getReputation', authUser.id)
      }
      if (!store.getters['user/learningPoints'] || store.getters['user/learningPoints']['.key'] !== authUser.id) {
        store.dispatch('user/getLearningPoints', authUser.id)
      }
    } else if (isUserRoute(route) || isAdminRoute(route)) {
      store.commit('setForwardRoute', route.path)
      redirect('/signup')
    }
  })
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin/evaluations')) {
    return true
  } else if (route.matched.some(record => record.path === '/admin')) {
    return true
  } else if (
    route.matched.some(record => record.path === '/admin/evaluation/:id?')
  ) {
    return true
  } else if (
    route.matched.some(record => record.path === '/admin/functions')
  ) {
    return true
  } else if (route.matched.some(record => record.path === '/admin/test')) {
    return true
  } else if (
    route.matched.some(record => record.path === '/admin/payments')
  ) {
    return true
  } else if (
    route.matched.some(record => record.path === '/admin/verifications')
  ) {
    return true
  } else {
    return false
  }
}

function isUserRoute(route) {
  if (route.matched.some(record => record.name === 'slug-chapter-id')) {
    return true
  } else if (route.matched.some(record => record.name === 'slug-challenge')) {
    return true
  } else if (
    route.matched.some(record => record.name === 'slug-submissions')
  ) {
    return true
  } else if (
    route.matched.some(record => record.name === 'slug-submission-id')
  ) {
    return true
  } else {
    return false
  }
}
