import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'

if (!firebase.apps.length) {
  let config = {}
  // if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  config = {
    apiKey: 'AIzaSyCeVrYS-hA-__9UGcaqEaGdBEQDZIUYi9s',
    authDomain: 'dacade-mvp-2.firebaseapp.com',
    databaseURL: 'https://dacade-mvp-2.firebaseio.com',
    projectId: 'dacade-mvp-2',
    storageBucket: 'dacade-mvp-2.appspot.com',
    messagingSenderId: '974386769381',
    appId: '1:974386769381:web:0452a0b85b74eb2e',
    measurementId: 'G-2TN6QTJQC',
  }
  // } else {
  //   config = {
  //     apiKey: 'AIzaSyCeVrYS-hA-__9UGcaqEaGdBEQDZIUYi9s',
  //     databaseURL: 'https://dacade-mvp-2.firebaseio.com'
  //   }
  // }
  firebase.initializeApp(config)
  // firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

export default firebase
