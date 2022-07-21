<template>
  <div class="bg-gray-100 rounded-full pl-2 py-2 flex items-center w-fit">
    <a target="__blank" class="block flex-none">
      <div
        class="w-10 h-10 rounded-full border border-solid flex items-center"
        :style="{
          backgroundColor: data.community.colors.primary,
        }"
      >
        <img
          :src="data.community.icon"
          class="mx-auto text-center flex items-center w-5"
        />
      </div>
    </a>
    <p class="inline-block px-2 flex-1">{{ data.community.name }}</p>
    <div
      class="bg-orange text-orange-light flex-none text-sm border border-solid border-yellow-100 px-1.5 rounded py-0.5 inline-block mr-4"
    >
      <span class="font-semibold">
        <Currency :value="data.score" token="REP"
      /></span>
    </div>
  </div>
</template>

<script>
// import EthereumLogo from '@/assets/icons/partners/ethereum.svg?data'
import CeloLogo from '@/assets/img/celo-logo.png'
import Currency from '~/components/ui/Currency'

export default {
  name: 'CommunityCardSmall',
  components: { Currency },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      partner: {
        logo: CeloLogo,
      },
    }
  },
}
</script>
