<template>
  <div>
    <Navigation />
    <div>
      <div class="container">
        <div class="row">
          <div v-for="(community) in communityData" :key="community.key" class="col-md-4 mb-4">
            <b-card
              :img-src="community.imgUrl"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem;"
              class="mb-2 bg-dark small-shadow"
            >
              <h4 class="text-center h-dark">
                {{ community.name }}
              </h4>
              <b-card-text class="muted-dark">
                <b class="muted-dark">~{{ community.time }}min</b>
                <b class="muted-dark">{{ community.submissionReward }}/{{ community.reviewReward }}$</b>
                <b class="muted-dark">{{ community.submissions }}sub</b>
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
    color:#acb2be;
    font-size: 1.2em;
  }
  .card-title{
    text-align: center;
  }
  .container{
    margin-top:4rem;
  }
</style>
