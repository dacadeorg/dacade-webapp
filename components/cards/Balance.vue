<template>
  <nuxt-link :to="localePath('/profile/wallets')">
    <div class="flex space-x-3 text-left hover:bg-gray-50 py-3 -mx-5 px-5">
      <Coin :token="details.token" size="medium" />
      <div class="pt-1 w-3/4">
        <div class="flex justify-between">
          <span class="block text-base font-medium leading-normal"
            ><Currency :value="details.balance" :token="details.token"
          /></span>
          <!-- <span class="block font-normal text-sm text-right">{{
            details.title
          }}</span> -->
        </div>

        <span class="text-sm text-gray-500 truncate block">{{address || details.title}}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Coin from '@/components/ui/Coin'
import Currency from '@/components/ui/Currency'
import {truncateAddress} from "~/utilities/Address";

export default {
  name: 'Balance',
  components: {
    Coin,
    Currency,
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
    wallet: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
  },

  computed: {
    address() {
      if (!this.details.address) return null
      return truncateAddress(this.details.address, this.details.token)
    },
  },
}
</script>
