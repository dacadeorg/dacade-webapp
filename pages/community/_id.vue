<template>
  <div>
    <Navigation />
    Welcome to {{ $route.params.id }}

  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { fireApp } from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation
  },
  asyncData({ params }) { // search engine friendly
    return fireApp.database().ref(`communityData/ae-dev-101`).once('value')
      .then((snapShot) => {
        let communityData = snapShot.val()
        communityData.key = params.id // snapShot.key
        return { communityData }
      })
  },
  mounted() {
    console.log('TEST', this.communityData)
  }
}
</script>
