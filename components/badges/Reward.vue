<template>
  <span
    class="
      bg-gray-200
      font-semibold
      text-white
      leading-none
      text-center
      inline-flex
      items-center
      justify-between
      rounded-full
      text-xs
      p-0.5
      h-5
      space-x-2
    "
  >
    <Coin :denom="denom" size="small" />
    <div class="text-gray-500 font-medium pl-0 pr-2">
      {{ value }}{{ denom }}
    </div>
  </span>
</template>

<script>
// import { mapGetters } from 'vuex'

import Coin from '@/components/ui/Coin'

export default {
  name: 'RewardBadge',
  components: {
    Coin,
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
  },
}
</script>
