<template>
  <div
    :v-if="reward"
    class="flex items-center bg-gray-200 rounded-3xl max-w-max"
  >
    <Coin :token="reward.token" size="small" />
    <div class="text-base lg:px-2 md:px-2">
      <span class="block font-medium text-xxs">{{ reward.token }}</span>
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
