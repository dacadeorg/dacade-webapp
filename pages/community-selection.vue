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
          style="max-width: 30rem;"
          class="mb-2 bg-dark text-white"
        >
          <b-card-text>
            <span>🕒 ~{{ community.time }}min</span>
            <span>💰 {{ community.submissionReward }}/{{ community.reviewReward }}$</span>
            <span>🎓 {{ community.submissions }}</span>
          </b-card-text>

          <nuxt-link
            class="btn btn-outline-primary btn-lg btn-block"
            :to="{path: communityPath(community.slug) }"
          >
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
<style scoped>
.card-text{
  text-align: center;
}
.card-title{
  text-align: center;
}
</style>
