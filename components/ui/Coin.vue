<template>
  <div
    :class="[sizeClasses, shapeClasses]"
    :style="{
      backgroundColor: bgColor || coin.bgColor,
      color: textColor || coin.textColor,
    }"
    class="inline-flex items-center justify-items-center text-white uppercase leading-none md:mr-0 mr-2"
  >
    <component
      :is="coin.icon"
      v-if="coin.icon"
      class="w-full h-auto max-h-full relative"
    />
  </div>
</template>

<script>
import DACIcon from '~/assets/icons/tokens/DAC.svg?inline'
import CUSDIcon from '~/assets/icons/tokens/cUSD.svg?inline'
import ETHIcon from '~/assets/icons/tokens/ETH.svg?inline'
import AEIcon from '~/assets/icons/tokens/AE.svg?inline'
import TEZIcon from '~/assets/icons/tokens/Tezos.svg?inline'
import DAIIcon from '~/assets/icons/tokens/DAI.svg?inline'
import NEARIcon from '~/assets/icons/tokens/NEAR.svg?inline'
export default {
  name: 'Coin',
  components: {
    DACIcon,
    CUSDIcon,
    ETHIcon,
    AEIcon,
    TEZIcon,
    DAIIcon,
    NEARIcon,
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
      default: 'medium',
      type: String,
    },
    shape: {
      default: 'circular',
      type: String,
    },
  },
  data() {
    return {
      coins: [
        {
          token: 'DAC',
          icon: DACIcon,
          bgColor: '#FBBF24',
          textColor: '#FFFFFF',
        },
        {
          token: 'cUSD',
          icon: CUSDIcon,
          bgColor: '#45CD85',
          textColor: '#FFFFFF',
        },
        {
          token: 'ETH',
          icon: ETHIcon,
          bgColor: '#627EEA',
          textColor: '#FFFFFF',
        },
        {
          token: 'AE',
          icon: AEIcon,
          bgColor: '#DE3F6B',
          textColor: '#FFFFFF',
        },
        {
          token: 'tez',
          icon: TEZIcon,
          bgColor: '#0D61FF',
          textColor: '#FFFFFF',
        },
        {
          token: 'DAI',
          icon: DAIIcon,
          bgColor: '#F5AC37',
          textColor: '#FEFEFD',
        },
        {
          token: 'NEAR',
          icon: NEARIcon,
          bgColor: '#000000',
          textColor: '#FFFFFF',
        },
      ],
    }
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'medium':
          return 'w-10 h-10 sm:w-15 sm:h-15 text-xl p-1  sm:text-2xl sm:p-2'
        case 'normal':
          return 'w-10 h-10 text-xl p-1'
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
      return this.getCoin(this.token) || this.getCoin('DAC')
    },
  },
  methods: {
    getCoin(token) {
      const value = token.toUpperCase()
      return this.coins.find((coin) => coin.token.toUpperCase() === value)
    },
  },
}
</script>
