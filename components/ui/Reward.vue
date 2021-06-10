<template>
  <div :v-if="reward" class="flex mt-3 md:mt-6 items-center">
    <Coin :denom="reward.denom" size="medium" />
    <div class="text-base pl-3">
      <span class="block font-medium"
        >{{ reward.amount }} {{ reward.denom }}</span
      >
      <span class="block text-sm">
        {{ $t('communities.rewards.per') }}
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
