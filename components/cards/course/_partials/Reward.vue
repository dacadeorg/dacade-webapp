<template>
  <div class="text-base text-left md:flex flex-start flex flex-col space-y-4">
    <div class="text-xxs pb-2 font-semibold uppercase text-gray-500">
      Reward
    </div>
    <div class="font-normal text-5xl text-gray-900">${{ reward.amount }}</div>
    <div
      :v-if="reward == true && size == 'medium'"
      class="flex items-center bg-gray-200 rounded-full max-w-max p-1"
    >
      <Coin :token="reward.token" :size="size" />
      <div
        class="lg:px-4 md:px-2 leading-none font-medium text-xxs text-gray-500"
      >
        {{ reward.token }}
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
