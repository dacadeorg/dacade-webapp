import firebase from 'firebase'
// const config = require('../config')()
// const fireconfig = config.fireConfig
const fireconfig = {
  apiKey: 'AIzaSyAi88RPq1CAxk4CWyejVQbJ9PxC_SmTZE0',
  authDomain: 'dacade-nuxt-test.firebaseapp.com',
  databaseURL: 'https://dacade-nuxt-test.firebaseio.com',
  projectId: 'dacade-nuxt-test',
  storageBucket: 'dacade-nuxt-test.appspot.com',
  messagingSenderId: '999895904334',
  appId: '1:999895904334:web:d7303f8564e7a213'
}

// eslint-disable-next-line import/no-mutable-exports
let fireApp
if (!fireApp && !firebase.apps.length) {
  fireApp = firebase.initializeApp(fireconfig)
} else {
  fireApp = firebase.app()
}

export default fireApp
