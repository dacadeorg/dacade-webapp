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
        firebase.database().ref(`admin/${authUser.id}`).once('value').then((snapShot) => {
          if (!snapShot.val()) {
            store.commit('setForwardRoute', route.path)
            redirect('/login')
          }
        })
      }
      if (!store.getters.user) {
        store.commit('setUser', authUser)
      }
      if (!store.getters.userBalance) {
        store.dispatch('getUserBalance', authUser.id)
      } else if (store.getters.userBalance['.key'] !== authUser.id) {
        store.dispatch('getUserBalance', authUser.id)
      }
      if (!store.getters.userNotifications) {
        store.dispatch('getUserNotifications', authUser.id)
      } else if (store.getters.userNotifications['.key'] !== authUser.id) {
        store.dispatch('getUserNotifications', authUser.id)
      }
      if (!store.getters.userReputation) {
        store.dispatch('getUserReputation', authUser.id)
      } else if (store.getters.userReputation['.key'] !== authUser.id) {
        store.dispatch('getUserReputation', authUser.id)
      }
      if (!store.getters.userLearningPoints) {
        store.dispatch('getUserLearningPoints', authUser.id)
      } else if (store.getters.userLearningPoints['.key'] !== authUser.id) {
        store.dispatch('getUserLearningPoints', authUser.id)
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
  } else if (route.matched.some(record => record.path === '/admin/evaluation/:id?')) {
    return true
  } else if (route.matched.some(record => record.path === '/admin/functions')) {
    return true
  } else if (route.matched.some(record => record.path === '/admin/test')) {
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
  } else if (route.matched.some(record => record.name === 'slug-submissions')) {
    return true
  } else if (route.matched.some(record => record.name === 'slug-submission-id')) {
    return true
  } else {
    return false
  }
}
