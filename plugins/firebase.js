import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import 'firebase/compat/auth'
// import 'firebase/compat/analytics'

// if (!firebase.apps.length) {
let config = {}
config = {
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  authDomain: 'dacade-d02d2.firebaseapp.com',
  appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
  measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
}
const firebase = initializeApp(config)

const auth = getAuth(firebase)
// }

// firebase.analytics()
export { auth }
export default firebase
