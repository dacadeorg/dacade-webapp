<template>
  <div class="bg-gray-50 rounded-full pl-2 py-2 flex items-center">
    <a v-for="(partner, i) in partners" :key="i" target="__blank" class="inline-block">
      <div class=" w-10 h-10 rounded-full border border-solid"><img :src="partner.logo" class="mx-auto flex items-center"/></div>
      
    </a>
    <p class="inline-block px-2">{{ title }}</p>
    <div class="bg-yellow-50 text-yellow-900 text-sm border border-solid border-yellow-100 rounded px-3 py-0.5 inline-block mr-4">
      <span class="font-semibold"> 100 REP</span>
    </div>
  </div>
</template>

<script>
import Ethereum from '@/assets/icons/partners/ethereum.svg?data'
export default {
  name: 'Test',
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
          logo: Ethereum,
        },
      ],
    }
  },
}
</script>
