import Notification from './notification'

export default class user {
  constructor (data) {
    this.entity = data
  }

  addNotification (details) {
    Notification.create(this.entity, details)
  }

  welcomeNotification () {
    this.addNotification({
      link: '/communities',
      message: `👋 Welcome to dacade ${
        this.entity.name
      }! In this notification view, you will be notified about your successes, like earnings from your submissions and reviews. To get started, click on this link and choose a learning community.`
    })
  }

  get (field) {
    if (this.entity[field]) {
      return this.entity[field]
    }
    return null
  }

  update (data) {
    return this.entity.updateProfile(data)
  }

  registered () {
    this.welcomeNotification()
    // this.$ga.event({
    //   eventCategory: 'registration',
    //   eventAction: `registration userId: ${this.entity.uid}`
    // })
  }
}
