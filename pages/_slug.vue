<template>
  <div>
    <Navigation />
    <notification-bar />
    <CommunityNavigation />
    <div class="container">
      <nuxt-child />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
import CommunityNavigation from '@/components/CommunityNavigation'
import apiJobMixin from '@/mixins/apiJobMixin'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    Navigation,
    CommunityNavigation,
    NotificationBar: NotificationBar
  },
  mixins: [apiJobMixin],
  fetch({ store, params }) {
    return firebase.database().ref(`LCData/${params.slug}`).once('value').then((snapShot) => {
      const lcData = snapShot.val()
      store.commit('content/setLc', lcData)
    })
  }
}
</script>
