<template>
  <div>
    <div
      :v-if="reward == true && size == 'medium'"
      class="flex items-center rounded-full max-w-max"
    >
      <Coin :token="reward.token" />
      <div class="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
        <div class="flex">
          <span class="block font-medium text-md pr-1">{{
            reward.amount
          }}</span>
          <span class="block font-medium text-md">{{ reward.token }}</span>
        </div>
        <div class="flex">
          <div class="text-gray-500 text-base font-normal pr-1">
            {{ $t('reward.type.prefix') }}
          </div>
          <div class="text-gray-500 text-base font-normal">
            {{ $t('communities.challenge.submission') }}
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
  },
}
</script>
