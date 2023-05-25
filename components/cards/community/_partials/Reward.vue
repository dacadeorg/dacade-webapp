<template>
  <span :v-if="reward"
    class="font-semibold leading-none text-center inline-flex items-center justify-between rounded-full text-xs p-0.5 h-5 space-x-2"
    :style="styles" :class="classes">
    <Coin :v-if="token" :token="token" size="small" />
    <div :v-if="amount" class="font-medium pl-0 pr-2">
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
      default: () => { },
      type: Object,
    },
    type: {
      default: 'transparent',
      type: String,
    },
    styles: {
      default: null,
      type: Object,
    }
  },
  computed: {
    token() {
      return this.reward?.token
    },
    amount() {
      return this.reward?.amount
    },
    classes() {
      if (this.styles) return null
      if (this.type === 'transparent') return 'bg-white bg-opacity-25 text-white'
      if (this.type === '') return 'bg-gray-200 text-gray-500'
      return null
    }
  },
}
</script>
