/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export default function ({ store, redirect, route }) {
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
        if (userData.role === 'admin') {
          authUser.role = userData.role
        } else if (isAdminRoute(route)) {
          redirect('/')
        }
        store.commit('setUser', authUser)
      })
    } else if (isAdminRoute(route)) {
      redirect('/login')
    } else if (isUserRoute(route)) {
      redirect('/login')
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
