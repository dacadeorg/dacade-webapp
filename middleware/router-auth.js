/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export default function ({ store, redirect, route }) {
  const authUser = store.getters['user/data']

  if (authUser) {
    // Todo: Fix this so we dont have to always make a call if user is admin
    if (isAdminRoute(route)) {
      store.commit('setForwardRoute', route.path)
      redirect('/login')
    }
    if (isGuestRoute(route)) {
      redirect('/')
    }

    if (route.path.startsWith('/profile')) {
      store.dispatch('user/communities/all')
    }
    // if(route.path.starts)
  } else if (isUserRoute(route) || isAdminRoute(route)) {
    store.commit('setForwardRoute', route.path)
    redirect('/login')
  }
}

function isAdminRoute(route) {
  return matchesRoutes(route, [
    '/admin/evaluations',
    '/admin',
    '/admin/evaluation/:id?',
    '/admin/functions',
    '/admin/test',
    '/admin/payments',
    '/admin/verifications',
  ])
}

function isUserRoute(route) {
  return matchesRoutes(
    route,
    ['bounties', 'profile', 'profile/notifications'],
    'name'
  )
}

function isGuestRoute(route) {
  return matchesRoutes(route, ['/signup', '/login', '/password-reset'])
}

function matchesRoutes(route, list, key = 'path') {
  const matches = list.filter((el) =>
    route.matched.some((record) => record[key].includes(el))
  )
  return matches.length > 0
}
