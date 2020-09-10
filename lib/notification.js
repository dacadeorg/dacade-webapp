import firebase from '@/plugins/firebase'

export default class Notification {
  static create(user, details, read = false) {
    const data = {
      date: Date.now(),
      displayName: user.displayName,
      notificationRead: read,
      userId: user.uid,
      ...details
    }
    this.store(user.uid, data)
  }

  static store(ref, data) {
    return firebase
      .database()
      .ref(`notifications/${ref}`)
      .push(data)
  }
}
