import firebase from '@/plugins/firebase'

export default function ({ store, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    // If the user is not authenticated
    if (user) {
      return redirect('/')
    }
  })
}
