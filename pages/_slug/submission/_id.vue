<template>
  <div>
    hi
    {{ submission }}
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      const submission = snapShot.val()
      //communityData.key = params.slug // snapShot.key
      return { submission }
    })
  }
}
</script>
