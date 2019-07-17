/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
export default function ({ store, redirect, route }) {
  console.log('route-test' + store.state.user)
  if (store.state.user != null && route.name === 'chapter') {
    console.log('route-test')
  }
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin')) {
    return true
  }
}
