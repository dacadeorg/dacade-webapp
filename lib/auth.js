import firebase from '@/plugins/firebase'
import User from './user'

export default class auth {
  static usernameAvailable(username) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('users')
        .orderByChild('displayName')
        .equalTo(`${username}`)
        .once('value')
        .then((snapShot) => {
          if (snapShot.exists()) {
            return reject(new Error('This username is already in use'))
          }
          return resolve(snapShot)
        })
        .catch((error) => {
          return reject(error)
        })
    })
  }

  static login(user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
  }

  static passwordResetRequest(email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  static verify(user) {
    return firebase
      .database()
      .ref(`userVerificationRequest/${user.userId}/${user.verificationType}`)
      .set({
        displayName: user.displayName,
        link: user.verificationLink
      })
  }

  static signUp({ email, password, name }) {
    return new Promise((resolve, reject) => {
      this.usernameAvailable(name)
        .then(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              const user = new User(firebase.auth().currentUser)
              user.update({
                displayName: name
              })
              user.registered()
              resolve(user)
            })
            .catch(error => reject(error))
        })
        .catch(error => reject(error))
    })
  }
}
