import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

const firebase = initializeApp({
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
  appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
  measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
})

const auth = getAuth(firebase)
const analytics = getAnalytics(firebase)

export { auth, analytics }
export default firebase
