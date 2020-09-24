/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

export default function ({ store, redirect, route }) {
  const authUser = store.getters['user/data']
  if (authUser) {
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
    if (isGuestRoute(route)) {
      redirect('/')
    }
  } else if (isUserRoute(route) || isAdminRoute(route)) {
    store.commit('setForwardRoute', route.path)
    redirect('/login')
  }
}

function isAdminRoute (route) {
  return matchesRoutes(route, [
    '/admin/evaluations',
    '/admin',
    '/admin/evaluation/:id?',
    '/admin/functions',
    '/admin/test',
    '/admin/payments',
    '/admin/verifications'
  ])
}

function isUserRoute (route) {
  return matchesRoutes(route, [
    'slug-chapter-id',
    'slug-challenge',
    'slug-submissions',
    'slug-submission-id',
    'bounties',
    'profile',
    'notifications'
  ], 'name')
}

function isGuestRoute (route) {
  return matchesRoutes(route, [
    '/signup',
    '/login',
    '/password-reset'
  ])
}

function matchesRoutes (route, list, key = 'path') {
  const matches = list.filter(el => route.matched.some(record => record[key] === el))
  return matches.length > 0
}
