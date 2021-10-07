/* eslint-disable no-console */
<template>
  <div
    v-if="bounties"
    class="
      divide-y
      bg-gray-50
      rounded-3xl
      space-y-0
      divide-y divide-y-gray-500
      px-0
      mb-10
      relative
      w-full
      lg:max-w-2xl
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
import Bounty from '@/components/cards/Bounty.vue'
import Referral from '@/components/cards/Referral.vue'
export default {
  name: 'BountyList',
  components: {
    Bounty,
    Referral,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
    token: {
      default: null,
      type: String,
    },
    bounties: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    referrals() {
      return [
        {
          name: 'Celo Development 101',
          icon: '/img/communities/celo.svg',
          type: 'Referral',
          colors: {
            text: '#fff',
            accent: '#2E3337',
            textAccent: '#34b276',
            primary: '#35C07D',
          },
          reward: {
            amount: 25,
            token: 'cUSD',
          },
          url: 'https://forms.gle/PLjPugvJpj9m2Qn7A',
        },
        {
          name: 'Tezos Starter Course',
          image: '/img/communities/tacode.webp',
          type: 'Challenge',
          colors: {
            text: '#0D61FF',
            accent: '#0D61FF',
            textAccent: '#fff',
            primary: '#0D61FF',
          },
          reward: {
            amount: 12,
            token: 'tez',
          },
          url: 'https://tacode.dev/courses/dev-starter',
        },
      ]
    },
  },
}
</script>
