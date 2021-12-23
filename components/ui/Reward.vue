<template>
  <div>
    <div
      :v-if="reward == true && size == 'medium'"
      class="flex items-center bg-gray-200 rounded-full max-w-max"
    >
      <Coin :token="reward.token" :size="size" />
      <div class="text-base lg:pl-2 lg:pr-3 md:px-2">
        <span class="block font-medium text-md">{{ reward.token }}</span>
      </div>
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
    size: {
      required: true,
      type: String,
    },
  },
}
</script>
