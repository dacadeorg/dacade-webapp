<template>
  <div :v-if="reward" class="flex mt-3 md:mt-6 items-center">
    <Coin :denom="reward.denom" class="w-10 h-10 md:w-15 md:h-15" />
    <div class="text-base pl-3">
      <span class="block font-medium"
        >{{ reward.amount }} {{ reward.denom }}</span
      >
      <span class="block text-sm"
        >Per
        <span class="capitalize">{{ reward.type.toLowerCase() }}</span></span
      >
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import Coin from '@/components/ui/Coin'
// import Section from '../partials/Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    // Section,
    Coin,
  },
  props: {
    reward: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
}
</script>
