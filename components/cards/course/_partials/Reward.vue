<template>
  <div
    class="text-base text-left flex sm:flex-start flex-row justify-between sm:flex-col sm:space-y-4"
  >
    <div
      class="text-xxs tracking-wider px-1 font-semibold uppercase text-gray-500"
    >
      {{ $t('course.challenge.reward') }}
    </div>
    <div>
      <div class="font-normal text-5xl text-gray-900">
        {{ reward.stable && '$' }}{{ reward.amount }}
      </div>
      <div v-if="reward" class="text-right sm:text-left mt-3">
        <RewardBadge :reward="{ token: reward.token }" type="gray" />
      </div>
    </div>
  </div>
</template>
<script>
import RewardBadge from '@/components/badges/Reward.vue'

export default {
  name: 'OverviewRewards',
  components: {
    RewardBadge,
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
