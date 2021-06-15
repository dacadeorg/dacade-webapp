<template>
  <span
    :v-if="reward"
    class="
      bg-white bg-opacity-25
      font-semibold
      text-white
      leading-none
      text-center
      inline-flex
      items-center
      justify-between
      rounded-full
      text-xs
      p-0.5
      h-5
      space-x-2
    "
  >
    <Coin :v-if="token" :token="token" size="small" />
    <div :v-if="token" class="text-gray-500 font-medium pl-0 pr-2">
      {{ amount }}{{ token }}
    </div>
  </span>
</template>

<script>
import Coin from '@/components/ui/Coin'

export default {
  name: 'RewardBadge',
  components: {
    Coin,
  },
  props: {
    reward: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    token() {
      return this.reward?.token
    },
    amount() {
      return this.reward?.amount
    },
  },
}
</script>
