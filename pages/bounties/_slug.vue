<template>
  <div class="flex justify-center content-wrapper">
    <div class="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
      <Navigation/>
    </div>
    <div class="flex-col w-full">
      <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
        {{ $t('nav.bounties') }}
      </h1>
      <BountyList :bounties="bountiesFiltered" :referrals="referralsFiltered"/>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */
import {mapGetters} from 'vuex'
// import firebase from '@/plugins/firebase'
import Navigation from '@/components/sections/bounties/Navigation'
import BountyList from '@/components/list/Bounty'
import {getMetadataTitle} from "~/utilities/Metadata";

export default {
  components: {Navigation, BountyList},
  fetch({store, params, error}) {
    return Promise.all([
      store.dispatch('bounties/findAll', params.slug),
      store.dispatch('bounties/findAll', params.slug),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.$route.params.slug, this.$t('nav.bounties')),
    }
  },
  computed: {
    ...mapGetters({
      bountiesFiltered: 'bounties/filteredList',
      referralsFiltered: 'referrals/filteredList',
      isAuthenticated: 'auth/check',
    }),
  },
}
</script>
