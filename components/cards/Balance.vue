<template>
  <div class="flex space-x-3 text-left hover:bg-gray-50 py-3 -mx-5 px-5">
    <Coin :token="details.token" size="medium" />
    <div class="pt-1">
      <span class="block text-base font-medium leading-normal"
        >{{ details.balance }} {{ details.token }}</span
      >
      <span class="block font-normal text-sm">{{ details.title }}</span>
    </div>
  </div>
</template>

<script>
import Coin from '@/components/ui/Coin'

export default {
  name: 'Balance',
  components: {
    Coin,
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object,
    },
    details: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
}
</script>
