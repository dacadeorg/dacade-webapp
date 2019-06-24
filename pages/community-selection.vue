<template>
  <div>
    <Navigation />
    <div>
      <div v-for="(community) in communityData" :key="community.key">
        <b-card
          :title="community.name"
          :img-src="community.imgUrl"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 bg-dark text-white"
        >
          <b-card-text>
            {{ community.key }}
          </b-card-text>

          <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{path: communityPath(community.slug) }">
            Learn more
          </nuxt-link>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityData`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      console.log(communityData)
      return { communityData }
    })
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/introduction`
    }
  }
}
</script>
