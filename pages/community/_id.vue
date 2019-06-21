<template>
  <div>
    <Navigation />
    Welcome to {{ $route.params.id }}
    Hello {{ communityData }}
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'

const db = firebase.database()

export default {
  components: {
    Navigation
  },
  asyncData({ params }) {
    return db.ref(`communityData/${params.id}`).once('value').then((snapShot) => {
      let communityData = snapShot.val()
      communityData.key = params.id // snapShot.key
      return { communityData }
    })
  }
}
</script>
