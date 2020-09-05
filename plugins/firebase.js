import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAmodim2lJZBradsjx6Zl98hECO7vpo2To',
    authDomain: 'dacade-d02d2.firebaseapp.com',
    databaseURL: 'https://dacade-d02d2.firebaseio.com',
    projectId: 'dacade-d02d2',
    storageBucket: 'dacade-d02d2.appspot.com',
    messagingSenderId: '194074425069',
    appId: '1:194074425069:web:a5bb551b56f220468b3ee4',
    measurementId: 'G-B9W96P14MV'
  })
}

export default firebase
