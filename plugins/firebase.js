import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAi88RPq1CAxk4CWyejVQbJ9PxC_SmTZE0',
    databaseURL: 'https://dacade-nuxt-test.firebaseio.com'
  })
}

export default firebase
