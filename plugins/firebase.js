import firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  let config = {}
  config = {
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  }
  firebase.initializeApp(config)
}

export default firebase
