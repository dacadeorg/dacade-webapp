<template>
  <div class="bg-gray-50 rounded-full pl-2 py-2 flex items-center mb-3">
      <a
        v-for="(partner, i) in partners"
        :key="i"
        target="__blank"
        class="inline-block md:mx-auto"
      >
        <div class="w-10 h-10 rounded-full border border-solid flex items-center">
          <img :src="partner.logo"  class="mx-auto text-center flex items-center w-5"/>
        </div>
      </a>
    <p class="inline-block px-2">{{ title }}</p>
    <div
      class="bg-orange text-orange_light text-sm border border-solid border-yellow-100 rounded px-3 py-0.5 inline-block mr-4"
    >
      <span class="font-semibold"> 100 REP</span>
    </div>
  </div>
</template>

<script>
// import EthereumLogo from '@/assets/icons/partners/ethereum.svg?data'
import CeloLogo from '@/assets/img/celo-logo.png'
export default {
  name: 'Communities',
  components: {},
  props: {
    title: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      partners: [
        {
          logo: CeloLogo,
        },
      ],
    }
  },
}
</script>
