<template>
  <span
    :class="[sizeClasses, shapeClasses]"
    :style="{
      backgroundColor: color || coin(denom).color,
    }"
    class="
      bg-primary
      inline-flex
      text-white
      items-center
      justify-center
      uppercase
      leading-none
    "
  >
    <img v-if="coin(denom).icon" :src="coin(denom).icon" />
  </span>
</template>

<script>
export default {
  name: 'Coin',
  props: {
    color: {
      default: null,
      type: String,
    },
    denom: {
      default: null,
      type: String,
    },
    size: {
      default: 'small',
      type: String,
    },
    shape: {
      default: 'circular',
      type: String,
    },
  },
  data() {
    return {
      coins: {
        DCN: {
          icon: require('~/assets/icons/logo.svg?data'),
          color: '#1B66F8',
        },
        CGLD: {
          icon: require('~/assets/icons/logo.svg?data'),
          color: '#34E256',
        },
      },
    }
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'medium':
          return 'w-15 h-15 text-2xl p-2'
        case 'small':
          return 'w-4 h-4 text-md p-0.5'
        default:
          return 'w-9 h-9 text-lg p-4'
      }
    },
    shapeClasses() {
      switch (this.shape) {
        case 'rounded':
          return 'rounded-xl'
        case 'squared':
          return 'rounded-none'
        default:
          return 'rounded-full'
      }
    },
  },
  methods: {
    coin(denom) {
      return this.coins[denom] ? this.coins[denom] : this.coins.DCN
    },
  },
}
</script>
