<template>
  <div>
    <p>
      {{ lcData.description }}
    </p>

    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
      Start now
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      lcData: 'content/lcData'
    })
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/chapter/0`
    }
  }
}
</script>
