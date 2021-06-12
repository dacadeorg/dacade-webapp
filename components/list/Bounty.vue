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
    <Bounty v-for="bounty in bounties" :key="bounty.id" :bounty="bounty" />
  </div>
</template>
<script>
import Bounty from '@/components/cards/Bounty.vue'
export default {
  name: 'BountyList',
  components: {
    Bounty,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
    denom: {
      default: null,
      type: String,
    },
    bounties: {
      default: () => [],
      type: Array,
    },
  },
}
</script>
