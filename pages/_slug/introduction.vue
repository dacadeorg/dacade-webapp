<template>
  <div>
    <p>
      {{ communityData.description }}
    </p>

    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
      Start now
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {
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
