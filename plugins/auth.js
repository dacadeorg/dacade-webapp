import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
export default (context) => {
  const { store } = context

  onIdTokenChanged(auth, async (user) => {
    await store.dispatch('user/getToken')
  })

  return new Promise((resolve, reject) => {
    return onAuthStateChanged(auth, (user) => {
      resolve(store.dispatch('user/fetch', user))
    })
  })
}
