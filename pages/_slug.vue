<template>
  <div class="relative">
    <div class="container relative">
      <nuxt-child />
    </div>
    <CommunityNavigation />
  </div>
</template>
<script>
/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import CommunityNavigation from '@/components/CommunityNavigation'

export default {
  scrollToTop: true,
  components: {
    CommunityNavigation,
  },
  fetch({ store, params }) {
    return firebase
      .database()
      .ref(`communityData/${params.slug}`)
      .once('value')
      .then((snapShot) => {
        const communityData = snapShot.val()
        store.commit('content/setCommunityData', communityData)
      })
  },
}
</script>
