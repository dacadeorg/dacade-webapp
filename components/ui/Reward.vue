<template>
  <div :v-if="reward" class="flex mt-3 md:mt-6 items-center">
    <Coin :token="reward.token" class="w-10 h-10 md:w-15 md:h-15" />
    <div class="text-base pl-3">
      <span class="block font-medium"
        >{{ reward.amount }} {{ reward.token }}</span
      >
      <span class="block text-sm"
        >Per
        <span class="capitalize">{{ reward.type.toLowerCase() }}</span></span
      >
    </div>
  </div>
</template>
<script>
import Coin from '@/components/ui/Coin'

export default {
  name: 'OverviewRewards',
  components: {
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
