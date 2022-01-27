<template>
  <div
    class="text-base text-left md:flex flex-start flex flex-col space-y-4 pt-4"
  >
    <div
      class="text-xxs tracking-wider px-1 font-semibold uppercase text-gray-500"
    >
      {{ $t('course.challenge.reward') }}
    </div>
    <div class="font-normal text-5xl text-gray-900">${{ reward.amount }}</div>
    <div
      :v-if="reward == true && size == 'medium'"
      class="
        flex
        items-center
        bg-gray-200
        rounded-full
        max-w-max
        text-center
        p-0.5
      "
    >
      <Coin :token="reward.token" :size="size" />
      <div
        class="
          lg:pl-2 lg:pr-3
          md:px-1
          leading-none
          font-medium
          text-xxs text-gray-500
          tracking-wider
        "
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
