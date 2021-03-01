<template>
  <div class="text-left">
    <span
      class="uppercase block text-xs font-semibold text-gray-500 leading-relaxed"
    >{{ $t('nav.balance') }}</span>
    <div class="space-y-4 mt-3">
      <BalanceCard
        v-for="balance in balances"
        :key="balance.denom"
        :details="balance"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BalanceCard from '@/components/cards/Balance'
import DacadeLogo from '~/assets/icons/logo.svg?data'

export default {
  name: 'BalanceList',
  components: {
    BalanceCard
  },
  props: {
    value: {
      default: 0,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      balanceRaw: 'user/balance'
    }),
    balances () {
      if (!this.balanceRaw) {
        return []
      }

      const list = Object.keys(this.balanceRaw).map(denom => ({
        denom: denom === 'DCN' ? 'DAC' : denom,
        icon: DacadeLogo,
        amount: this.balanceRaw[denom],
        description: 'Dacade Points'
      }))
      return list.filter(balance => balance.amount)
    }
  }
}
</script>
