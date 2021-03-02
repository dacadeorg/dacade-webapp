<template>
  <div class="relative">
    <MainHeader />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import MainHeader from '@/components/sections/communities/MainHeader'

export default {
  scrollToTop: true,
  layout: 'community',
  components: {
    MainHeader
  },
  fetch ({ store, params }) {
    return store.dispatch('communities/find', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
