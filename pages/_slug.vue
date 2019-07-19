<template>
  <div>
    <Navigation />
    <CommunityNavigation />
    <div class="container">
      <nuxt-child/>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
import CommunityNavigation from '@/components/CommunityNavigation'

export default {
  components: {
    Navigation,
    CommunityNavigation
  },
  fetch({ store, params }) {
    return firebase.database().ref(`LCData/${params.slug}`).once('value').then((snapShot) => {
      const lcData = snapShot.val()
      store.commit('content/setLc', lcData)
    })
  }
}
</script>
