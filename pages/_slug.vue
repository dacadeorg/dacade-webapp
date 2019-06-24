<template>
  <div>
    <nuxt-child :community-data="communityData" />
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityData/${params.slug}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      communityData.key = params.slug // snapShot.key
      return { communityData }
    })
  }
}
</script>
