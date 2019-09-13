/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { firebaseAction } from 'vuexfire'

export default function ({ store, redirect, route }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const authUser = {
        id: user.uid,
        email: user.email,
        displayName: user.displayName
      }
      if (isAdminRoute(route)) {
        firebase.database().ref(`admin/${authUser.id}`).once('value').then((snapShot) => {
          if (!snapShot.val()) {
            store.commit('setForwardRoute', route.path)
            redirect('/login')
          }
        })
      }
      store.commit('setUser', authUser)
      store.dispatch('getUserNotifications', authUser.id)
      store.dispatch('getUserBalance', authUser.id)
      store.dispatch('getUserReputation', authUser.id)
    } else if (isUserRoute(route) || isAdminRoute(route)) {
      store.commit('setForwardRoute', route.path)
      redirect('/signup')
    }
  })
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin/gradings')) {
    return true
  } else if (route.matched.some(record => record.path === '/admin/grading/:id?')) {
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
