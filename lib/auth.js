import firebase from '@/plugins/firebase'
import User from './user'

export default class auth {
  static usernameAvailable (username) {
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

  static login (user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
  }

  static passwordResetRequest (email) {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  static verify (user) {
    return firebase
      .database()
      .ref(`userVerificationRequest/${user.userId}/${user.verificationType}`)
      .set({
        displayName: user.displayName,
        link: user.verificationLink
      })
  }

  static signUp ({ email, password, name }) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await this.usernameAvailable(name)
          const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
          const user = new User(response.user)
          await user.update({
            displayName: name
          })
          await user.registered()
          resolve(user.entity)
        } catch (error) {
          reject(error)
        }
      })()
    })
  }
}
