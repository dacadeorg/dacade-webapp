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
    <Bounty v-for="(bounty, i) in bounties" :key="i" :bounty="bounty" />
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
    bounties: {
      default: () => [],
      type: Array,
    },
    referrals: {
      default: () => [],
      type: Array,
    },
  },
}
</script>
