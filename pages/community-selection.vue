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
          class="mb-2"
        >
          <b-card-text>
            {{ community.description }}
          </b-card-text>

          <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{path: communityPath(community.key) }">
            Learn more
          </nuxt-link>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  components: {
    Navigation
  },
  data() {
    return {
    }
  },
  computed: {
    communityData() {
      return this.$store.getters['content/communityData']
    }
  },
  created() {
    const loadedCommunity = this.$store.getters['content/communityData']
    if (loadedCommunity.length === 0) {
      this.$store.dispatch('content/getCommunityData')
    }
  },
  methods: {
    communityPath(slug) {
      return `/community/${slug}`
    }
  }
}
</script>
