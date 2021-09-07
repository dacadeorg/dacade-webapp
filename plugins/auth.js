import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    return onAuthStateChanged(auth, (user) => {
      resolve(store.dispatch('user/fetch', user))
    })
  })
}
