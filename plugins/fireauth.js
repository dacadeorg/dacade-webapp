import firebase from '@/plugins/firebase'

export default (context) => {
  const { store, route } = context
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('user/set', user)
        // fetch the admin data for admin routes
        if (route.path.startsWith('/admin')) {
          store.dispatch('admin/fetch', {
            id: user.uid
          }).then(() => {
            return resolve(user)
          }).catch(() => {
            return resolve(user)
          })
        } else {
          // if routes are not for admin just return the user
          return resolve(user)
        }
      } else {
        store.commit('user/set', null)
        return resolve(user)
      }
    })
  })
}