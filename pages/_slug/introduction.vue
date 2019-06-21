<template>
  <div>
    <Navigation />
    <p>
      {{ communityData.description }}
    </p>

    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{path: communityPath(communityData.slug) }">
      Start now
    </nuxt-link>
  </div>
</template>
<script>
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityData/${params.slug}`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      communityData.key = params.slug // snapShot.key
      return { communityData }
    })
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/chapter/0`
    }
  }
}
</script>
