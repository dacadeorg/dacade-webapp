<template>
  <div class="flex justify-center content-wrapper">
    <div class="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
      <Navigation />
    </div>
    <div class="flex-col w-full">
      <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
        {{ $t('nav.bounties') }}
      </h1>
      <BountyList :bounties="bounties" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */
import { mapGetters } from 'vuex'
// import firebase from '@/plugins/firebase'
import Navigation from '@/components/sections/bounties/Navigation'
import BountyList from '@/components/list/Bounty'

export default {
  components: { Navigation, BountyList },
  fetch({ store }) {
    return store.dispatch('bounties/all')
  },
  computed: {
    ...mapGetters({
      bounties: 'bounties/list',
      isAuthenticated: 'auth/check',
    }),
  },
  mounted() {
    console.log(this.bounties)
  },
}
</script>
