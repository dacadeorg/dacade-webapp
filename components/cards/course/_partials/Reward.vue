<template>
  <div
    class="text-base text-left md:flex flex-start flex flex-col pl-10 max-w-xs"
  >
    <span class="font-light text-xxs pb-2"> REWARD </span>
    <span class="font-light text-5xl pb-2">
      {{ reward.amount }}
    </span>
    <div>
      <div
        :v-if="reward == true && size == 'medium'"
        class="flex items-center bg-gray-200 rounded-full max-w-max"
      >
        <Coin :token="reward.token" :size="size" />
        <div class="text-base lg:px-4 md:px-2">
          <span :v-show="size == 'small'" class="block font-medium text-xxs">{{
            reward.token
          }}</span>
        </div>
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
