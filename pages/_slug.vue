<template>
  <div>
    <Navigation />
    <div class="container">
      <nuxt-child :community-data="communityData" />
    </div>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  data() {
    return {
    }
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
