/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export default async function ({ store, redirect, route }) {
  const authUser = store.getters['user/data']
  const auth = store.getters['auth/data']

  if (route?.path?.startsWith('/verify-email')) {
    return
  }

  if (
    auth &&
    !auth.emailVerified &&
    !route?.path?.startsWith('/email-verification')
  ) {
    return redirect('/email-verification')
  }

  if (authUser && isGuestRoute(route)) {
    return redirect('/')
  }

  if (!authUser && isUserRoute(route)) {
    store.commit('setForwardRoute', route.path)
    return redirect('/login')
  }

  if (route?.path?.startsWith('/profile')) {
    await store.dispatch('profile/users/fetch', route.params?.username)
    await store.dispatch(
      'profile/communities/all',
      route.params?.username || authUser?.displayName
    )
  }
}

function isUserRoute(route) {
  return matchesRoutes(
    route,
    [
      'bounties',
      'profile/wallets',
      'profile/referrals',
      'profile/notifications',
    ],
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
