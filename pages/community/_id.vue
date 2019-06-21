<template>
  <div>
    <Navigation />
    Welcome to {{ $route.params.id }}
    Hello {{ communityData }}
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },

  computed: {
    ...mapGetters({
      communityData: 'content/communityData'
    })
  },

  created() {
    this.contentInit()
  },

  methods: {
    ...mapActions({
      contentInit: 'content/init'
    })
  }
}
</script>
