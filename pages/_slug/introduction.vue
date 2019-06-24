<template>
  <div v-if="communityData">
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
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/chapter/0`
    }
  }
}
</script>
