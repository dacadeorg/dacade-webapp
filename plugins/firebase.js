import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

if (!firebase.apps.length) {
  let config = {}
  config = {
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
    appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
    measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
  }
  firebase.initializeApp(config)
}

firebase.analytics()

export default firebase
