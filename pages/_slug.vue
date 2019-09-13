<template>
  <div>
    <NavigationInCommunity />
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
import NavigationInCommunity from '@/components/NavigationInCommunity'
import CommunityNavigation from '@/components/CommunityNavigation'
import apiJobMixin from '@/mixins/apiJobMixin'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    NavigationInCommunity,
    CommunityNavigation,
    NotificationBar: NotificationBar
  },
  mixins: [apiJobMixin],
  fetch({ store, params }) {
    return firebase.database().ref(`communityData/${params.slug}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      store.commit('content/setCommunityData', communityData)
    })
  }
}
</script>
