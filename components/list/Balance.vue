<template>
  <div class="text-left">
    <span
      class="
        uppercase
        block
        text-xs
        font-semibold
        text-gray-500
        leading-relaxed
      "
      >{{ $t('nav.balance') }}</span
    >
    <div class="space-y-4 mt-3">
      <BalanceCard
        v-for="wallet in wallets"
        :key="wallet.id"
        :details="wallet"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BalanceCard from '@/components/cards/Balance'

export default {
  name: 'BalanceList',
  components: {
    BalanceCard,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
    }),
  },
}
</script>
