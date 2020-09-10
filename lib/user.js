import Notification from './notification'

export default class user {
  constructor(data) {
    this.entity = data
    this.data = {
      id: data.uid,
      email: data.email,
      displayName: data.displayName
    }
  }

  addNotification(details) {
    Notification.create(this.entity, details)
  }

  welcomeNotification() {
    this.addNotification({
      link: '/communities',
      message: `👋 Welcome to dacade ${this.data.displayName}! In this notification view, you will be notified about your successes, like earnings from your submissions and reviews. To get started, click on this link and choose a learning community.`
    })
  }

  get(field) {
    if (this.entity[field]) {
      return this.entity[field]
    }
    return null
  }

  update(data) {
    Object.keys(data).forEach((key) => {
      this.data[key] = data[key]
    })
    return this.entity.updateProfile(data)
  }

  registered() {
    this.welcomeNotification()
    // this.$ga.event({
    //   eventCategory: 'registration',
    //   eventAction: `registration userId: ${this.entity.uid}`
    // })
  }
}
