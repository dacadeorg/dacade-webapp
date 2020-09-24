import firebase from '@/plugins/firebase'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.commit('user/set', {
          id: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      } else {
        store.commit('user/set', null)
      }
      resolve(user)
    })
  })
}
