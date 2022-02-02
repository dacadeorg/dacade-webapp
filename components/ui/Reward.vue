<template>
  <div>
    <div
      :v-if="reward == true && size == 'medium'"
      class="flex items-center rounded-full max-w-max mr-4"
    >
      <Coin :token="reward.token" />
      <div class="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
        <div class="flex">
          <span class="block font-medium text-base pr-1">{{
            reward.amount
          }}</span>
          <span class="block font-medium text-base">{{ reward.token }}</span>
        </div>
        <div class="flex">
          <div class="text-gray-500 text-sm font-normal pr-1">
            {{ $t('reward.type.prefix') }}
          </div>
          <div class="text-gray-500 text-sm font-normal">
            {{ $t(`communities.challenge.${category}`) }}
          </div>
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
    category: {
      default: null,
      type: String,
    },
  },
}
</script>
