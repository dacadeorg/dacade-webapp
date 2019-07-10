<template>
  <div>
    <Navigation />
    <CommunityNavigation :community-data="communityData" />
    {{ user }}
    <div class="container">
      <nuxt-child :community-data="communityData" />
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
import CommunityNavigation from '@/components/CommunityNavigation'
import { mapGetters } from 'vuex'
/* eslint-disable no-console */

export default {
  components: {
    Navigation,
    CommunityNavigation
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  asyncData({ params }) {
    return firebase.database().ref(`LCData/${params.slug}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      communityData.key = params.slug // snapShot.key
      return { communityData }
    })
  }
}
</script>
