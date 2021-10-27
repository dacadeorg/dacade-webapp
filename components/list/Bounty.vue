/* eslint-disable no-console */
<template>
  <div
    v-if="bounties"
    class="
      divide-y
      bg-gray-50
      rounded-3xl
      space-y-0
      divide-y divide-gray-200
      px-0
      mb-10
      relative
      w-full
      lg:max-w-2xl
      overflow-hidden
    "
  >
    <Referral
      v-for="referral in referrals"
      :key="referral.name"
      :referral="referral"
    />
    <Bounty v-for="bounty in bounties" :key="bounty.id" :bounty="bounty" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Bounty from '@/components/cards/Bounty.vue'
import Referral from '@/components/cards/Referral.vue'
export default {
  name: 'BountyList',
  components: {
    Bounty,
    Referral,
  },
  computed: {
    ...mapGetters({
      bountiesList: 'bounties/list',
      referrals: 'referrals/list',
      isAuthenticated: 'auth/check',
    }),
    bounties() {
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
          rewards: [
            {
              amount: 12,
              token: 'tez',
              type: 'SUBMISSION',
            },
          ],
          url: 'https://tacode.dev/courses/dev-starter',
        },
        ...(this.bountiesList || []),
      ]
    },
  },
}
</script>
