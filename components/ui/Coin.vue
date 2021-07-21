<template>
  <span
    :class="[sizeClasses, shapeClasses]"
    :style="{
      backgroundColor: bgColor || coin.bgColor,
      color: textColor || coin.textColor,
    }"
    class="
      inline-flex
      items-center
      justify-items-center
      text-white
      uppercase
      leading-none
    "
  >
    <component
      :is="coin.icon"
      v-if="coin.icon"
      class="w-full h-auto max-h-full relative"
    />
  </span>
</template>

<script>
import DACIcon from '~/assets/icons/tokens/DAC.svg?inline'
import CUSDIcon from '~/assets/icons/tokens/cUSD.svg?inline'
import ETHIcon from '~/assets/icons/tokens/ETH.svg?inline'
import AEIcon from '~/assets/icons/tokens/AE.svg?inline'
import TEZIcon from '~/assets/icons/tokens/Tezos.svg?inline'
export default {
  name: 'Coin',
  components: {
    DACIcon,
    CUSDIcon,
    ETHIcon,
    AEIcon,
    TEZIcon,
  },
  props: {
    bgColor: {
      default: null,
      type: String,
    },
    textColor: {
      default: null,
      type: String,
    },
    token: {
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
        DAC: {
          icon: DACIcon,
          bgColor: '#FBBF24',
          textColor: '#FFFFFF',
        },
        cUSD: {
          icon: CUSDIcon,
          bgColor: '#45CD85',
          textColor: '#FFFFFF',
        },
        ETH: {
          icon: ETHIcon,
          bgColor: '#627EEA',
          textColor: '#FFFFFF',
        },
        AE: {
          icon: AEIcon,
          bgColor: '#DE3F6B',
          textColor: '#FFFFFF',
        },
        tez: {
          icon: TEZIcon,
          bgColor: '#0D61FF',
          textColor: '#FFFFFF',
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
    coin() {
      return this.coins[this.token] ? this.coins[this.token] : this.coins.DAC
    },
  },
}
</script>
