import firebase from '@/plugins/firebase'

export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    return firebase.auth().onAuthStateChanged((user) => {
      resolve(store.dispatch('user/fetch', user))
    })
  })
}
