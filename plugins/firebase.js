import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCeVrYS-hA-__9UGcaqEaGdBEQDZIUYi9s',
    databaseURL: 'https://dacade-mvp-2.firebaseio.com'
  })
}

export default firebase
