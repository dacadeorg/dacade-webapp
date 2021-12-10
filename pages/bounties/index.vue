<template>
  <div class="flex justify-center content-wrapper">
    <div class="hidden lg:block w-1/4 mt-28 py-3 pr-10 lg:py-14">
      <Navigation />
    </div>
    <div class="flex-col w-full">
      <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
        {{ $t('nav.bounties') }}
      </h1>
      <BountyList :bounties="bountiesList" :referrals="referrals" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */

// import firebase from '@/plugins/firebase'
import { mapGetters } from 'vuex'
import Navigation from '@/components/sections/bounties/Navigation'
import BountyList from '@/components/list/Bounty'

export default {
  components: { Navigation, BountyList },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('referrals/all'),
      store.dispatch('bounties/all'),
    ])
  },
  computed: {
    ...mapGetters({
      referrals: 'referrals/list',
      isAuthenticated: 'auth/check',
      bounties: 'bounties/list',
    }),
    bountiesList() {
      return [
        {
          name: 'Tezos Starter Course',
          image: '/img/communities/tacode.webp',
          type: 'Challenge',
          link: 'https://tacode.dev/courses/dev-starter/challenges/f9c23fc7-3022-4347-b19c-66cc2424ac2f',
          colors: {
            text: '#0D61FF',
            accent: '#0D61FF',
            textAccent: '#fff',
            primary: '#0D61FF',
          },
          reward: {
            amount: 12,
            token: 'tez',
            type: 'SUBMISSION',
          },
          url: 'https://tacode.dev/courses/dev-starter',
        },
        ...(this.bounties || []),
      ]
    },
  },
}
</script>
